import type { FavoritePokemon } from '@interfaces/favorite-pokemon';

const FAVORITES_KEY = 'favorites';

export class FavoritesManager {
  
  static getFavorites(): FavoritePokemon[] {
    try {
      const data = localStorage.getItem(FAVORITES_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error loading favorites:', error);
      return [];
    }
  }

  static saveFavorites(favorites: FavoritePokemon[]): void {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      console.log('💾 Favoritos guardados:', favorites.length);
      
      // Disparar evento personalizado para notificar cambios
      window.dispatchEvent(new CustomEvent('favoritesChanged', { 
        detail: favorites 
      }));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }

  static addFavorite(pokemon: FavoritePokemon): boolean {
    const favorites = this.getFavorites();
    
    // Verificar si ya existe
    if (favorites.some(fav => fav.name === pokemon.name || fav.id === pokemon.id)) {
      console.warn('⚠️ Pokemon ya está en favoritos:', pokemon.name);
      return false;
    }

    favorites.push(pokemon);
    this.saveFavorites(favorites);
    console.log('❤️ Pokemon agregado a favoritos:', pokemon.name);
    return true;
  }

  static removeFavorite(pokemonName: string): boolean {
    const favorites = this.getFavorites();
    const initialLength = favorites.length;
    
    const newFavorites = favorites.filter(fav => fav.name !== pokemonName);
    
    if (newFavorites.length < initialLength) {
      this.saveFavorites(newFavorites);
      console.log('💔 Pokemon eliminado de favoritos:', pokemonName);
      return true;
    }
    
    console.warn('⚠️ Pokemon no encontrado en favoritos:', pokemonName);
    return false;
  }

  static isFavorite(pokemonName: string): boolean {
    const favorites = this.getFavorites();
    return favorites.some(fav => fav.name === pokemonName);
  }

  static toggleFavorite(pokemon: FavoritePokemon): boolean {
    if (this.isFavorite(pokemon.name)) {
      this.removeFavorite(pokemon.name);
      return false; // Removed
    } else {
      this.addFavorite(pokemon);
      return true; // Added
    }
  }

  static clearAll(): void {
    this.saveFavorites([]);
    console.log('🗑️ Todos los favoritos eliminados');
  }
}
