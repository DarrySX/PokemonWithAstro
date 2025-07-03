import type { FavoritePokemon } from '@interfaces/favorite-pokemon';
import { For, createSignal, onMount } from 'solid-js';
import { FavoritePokemonCard } from './FavoritePokemonCard';

// Utilidades para manejar favoritos (duplicadas para evitar problemas de imports)
const getFavoritesFromStorage = (): FavoritePokemon[] => {
  try {
    const data = localStorage.getItem('favorites');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

const saveFavoritesToStorage = (favorites: FavoritePokemon[]): void => {
  try {
    localStorage.setItem('favorites', JSON.stringify(favorites));
    console.log('💾 Favoritos guardados desde SolidJS:', favorites.length);
    
    // Disparar evento personalizado para notificar cambios
    window.dispatchEvent(new CustomEvent('favoritesChanged', { 
      detail: favorites 
    }));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

const removeFavoriteFromStorage = (pokemonName: string): boolean => {
  const favorites = getFavoritesFromStorage();
  const initialLength = favorites.length;
  
  const newFavorites = favorites.filter(fav => fav.name !== pokemonName);
  
  if (newFavorites.length < initialLength) {
    saveFavoritesToStorage(newFavorites);
    console.log('💔 Pokemon eliminado de favoritos (SolidJS):', pokemonName);
    return true;
  }
  
  console.warn('⚠️ Pokemon no encontrado en favoritos:', pokemonName);
  return false;
};

export const FavoritePokemons = () => {
  const [pokemons, setPokemons] = createSignal<FavoritePokemon[]>(getFavoritesFromStorage());

  onMount(() => {
    console.log('🔄 Componente FavoritePokemons montado');
    
    // Escuchar cambios en favoritos
    const handleFavoritesChanged = (e: CustomEvent) => {
      console.log('📦 Favoritos actualizados desde evento:', e.detail);
      setPokemons(e.detail);
    };

    // Escuchar cambios en localStorage desde otras pestañas
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'favorites') {
        console.log('📦 Favoritos actualizados desde localStorage externo');
        setPokemons(getFavoritesFromStorage());
      }
    };

    window.addEventListener('favoritesChanged', handleFavoritesChanged as EventListener);
    window.addEventListener('storage', handleStorageChange);

    // Actualizar favoritos periódicamente como backup
    const interval = setInterval(() => {
      const currentFavorites = getFavoritesFromStorage();
      if (currentFavorites.length !== pokemons().length) {
        console.log('🔄 Actualizando favoritos por diferencia detectada');
        setPokemons(currentFavorites);
      }
    }, 2000);

    // Cleanup
    return () => {
      window.removeEventListener('favoritesChanged', handleFavoritesChanged as EventListener);
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  });

  const handleRemoveFavorite = (pokemonName: string) => {
    console.log('🗑️ Intentando eliminar:', pokemonName);
    removeFavoriteFromStorage(pokemonName);
    setPokemons(getFavoritesFromStorage());
  };

  return (
    <div>
      {pokemons().length > 0 ? (
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <For each={pokemons()}>
            {(pokemon, index) => (
              <div class="animate-slide-up" style={`animation-delay: ${index() * 50}ms`}>
                <FavoritePokemonCard 
                  pokemon={pokemon} 
                  onRemove={() => handleRemoveFavorite(pokemon.name)}
                />
              </div>
            )}
          </For>
        </div>
      ) : (
        <div class="text-center py-16">
          <div class="mx-auto max-w-md">
            <div class="mx-auto h-24 w-24 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mb-6">
              <span class="text-4xl">💔</span>
            </div>
            <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No tienes Pokémon favoritos aún
            </h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              Comienza explorando la lista de Pokémon y marca algunos como favoritos haciendo clic en el corazón ❤️
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
              <a 
                href="/" 
                class="inline-flex items-center justify-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                🏠 Ir al Inicio
              </a>
              <a 
                href="/pokemons/1" 
                class="inline-flex items-center justify-center rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary-700"
              >
                🔍 Explorar Pokémon
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
