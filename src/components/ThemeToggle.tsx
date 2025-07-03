import { createSignal, onMount, type Component } from 'solid-js';

export const ThemeToggle: Component = () => {
  const [theme, setTheme] = createSignal<'light' | 'dark'>('dark');
  const [mounted, setMounted] = createSignal(false);

  // Función para obtener tema actual
  const getCurrentTheme = (): 'light' | 'dark' => {
    if (typeof window === 'undefined') return 'dark';
    
    try {
      const stored = localStorage.getItem('theme-preference');
      if (stored) return stored as 'light' | 'dark';
      
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'dark';
    }
  };

  // Aplicar tema al HTML
  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (typeof window === 'undefined') return;
    
    const html = document.documentElement;
    
    // Remover clase anterior y agregar nueva
    html.classList.remove('dark', 'light');
    
    if (newTheme === 'dark') {
      html.classList.add('dark');
    }
    
    console.log('🎨 Tema aplicado:', newTheme, 'Clases:', html.classList.toString());
  };

  // Cambiar tema
  const toggleTheme = () => {
    const currentTheme = theme();
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    setTheme(newTheme);
    applyTheme(newTheme);
    
    try {
      localStorage.setItem('theme-preference', newTheme);
      
      // Disparar evento para sincronización
      window.dispatchEvent(new CustomEvent('themeChanged', {
        detail: { theme: newTheme }
      }));
      
      console.log('🎨 Tema cambiado a:', newTheme);
      console.log('🎨 Clases del documento:', document.documentElement.classList.toString());
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  onMount(() => {
    // Inicializar tema
    const initialTheme = getCurrentTheme();
    setTheme(initialTheme);
    applyTheme(initialTheme);
    setMounted(true);

    // Escuchar cambios de tema desde otros componentes
    const handleThemeChange = (e: CustomEvent) => {
      setTheme(e.detail.theme);
    };

    window.addEventListener('themeChanged', handleThemeChange as EventListener);

    // Cleanup
    return () => {
      window.removeEventListener('themeChanged', handleThemeChange as EventListener);
    };
  });

  return (
    <button
      onClick={toggleTheme}
      class="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-500 transition-all hover:bg-gray-50 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-100 dark:focus:ring-offset-gray-900"
      title={`Cambiar a tema ${theme() === 'dark' ? 'claro' : 'oscuro'}`}
      aria-label={`Cambiar a tema ${theme() === 'dark' ? 'claro' : 'oscuro'}`}
    >
      {mounted() ? (
        <div class="relative">
          {/* Sol (tema claro) */}
          <svg
            class={`h-5 w-5 transition-all duration-300 ${
              theme() === 'dark' 
                ? 'rotate-0 scale-100' 
                : 'rotate-90 scale-0'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={theme() === 'light' ? 'position: absolute; top: 0; left: 0;' : ''}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
          
          {/* Luna (tema oscuro) */}
          <svg
            class={`h-5 w-5 transition-all duration-300 ${
              theme() === 'light' 
                ? 'rotate-0 scale-100' 
                : '-rotate-90 scale-0'
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            style={theme() === 'dark' ? 'position: absolute; top: 0; left: 0;' : ''}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
        </div>
      ) : (
        <div class="h-5 w-5 animate-pulse bg-gray-300 rounded dark:bg-gray-600" />
      )}
    </button>
  );
};
