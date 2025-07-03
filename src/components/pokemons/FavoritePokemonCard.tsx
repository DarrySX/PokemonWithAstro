import type { FavoritePokemon } from '@interfaces/favorite-pokemon';
import { Show, createSignal, type Component } from 'solid-js';

interface Props {
  pokemon: FavoritePokemon;
  onRemove?: () => void;
}

export const FavoritePokemonCard: Component<Props> = ({ pokemon, onRemove }) => {
  const [isVisible, setIsVisible] = createSignal(true);

  const imageSrc = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;

  const deleteFavorite = () => {
    console.log('🗑️ Eliminando Pokemon de favoritos:', pokemon.name);
    setIsVisible(false);
    
    // Notificar al componente padre
    if (onRemove) {
      onRemove();
    }
  };

  return (
    <Show when={isVisible()}>
      <div class="flex flex-col justify-center items-center p-2 border rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors">
        <a href={`/pokemons/${pokemon.name}`}>
          <img
            src={imageSrc}
            alt={pokemon.name}
            width="96"
            height="96"
            style={`view-transition-name: ${pokemon.name}-image`}
            class="hover:scale-105 transition-transform"
          />
          <p class="capitalize text-center mt-2 text-blue-300">
            #{pokemon.id} {pokemon.name}
          </p>
        </a>
        <button 
          onClick={deleteFavorite} 
          class="text-red-400 hover:text-red-300 mt-2 px-3 py-1 rounded bg-red-900/20 hover:bg-red-900/40 transition-colors text-sm"
        >
          Eliminar
        </button>
      </div>
    </Show>
  );
};
