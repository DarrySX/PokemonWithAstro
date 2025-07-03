// Utilidad para manejar el tema
export class ThemeManager {
  private static readonly THEME_KEY = 'theme-preference';
  private static readonly DARK_CLASS = 'dark';
  
  static getStoredTheme(): 'light' | 'dark' | null {
    if (typeof window === 'undefined') return null;
    
    try {
      const stored = localStorage.getItem(this.THEME_KEY);
      return stored as 'light' | 'dark' | null;
    } catch {
      return null;
    }
  }
  
  static getSystemTheme(): 'light' | 'dark' {
    if (typeof window === 'undefined') return 'dark';
    
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  
  static getCurrentTheme(): 'light' | 'dark' {
    return this.getStoredTheme() || this.getSystemTheme();
  }
  
  static setTheme(theme: 'light' | 'dark'): void {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.setItem(this.THEME_KEY, theme);
      this.applyTheme(theme);
      
      // Disparar evento para sincronización
      window.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { theme }
      }));
      
      console.log('🎨 Tema cambiado a:', theme);
    } catch (error) {
      console.error('Error setting theme:', error);
    }
  }
  
  static applyTheme(theme: 'light' | 'dark'): void {
    if (typeof window === 'undefined') return;
    
    const html = document.documentElement;
    
    if (theme === 'dark') {
      html.classList.add(this.DARK_CLASS);
    } else {
      html.classList.remove(this.DARK_CLASS);
    }
  }
  
  static toggleTheme(): 'light' | 'dark' {
    const currentTheme = this.getCurrentTheme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    return newTheme;
  }
  
  static initialize(): void {
    if (typeof window === 'undefined') return;
    
    const theme = this.getCurrentTheme();
    this.applyTheme(theme);
    
    // Escuchar cambios del sistema
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!this.getStoredTheme()) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
}
