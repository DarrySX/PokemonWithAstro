import { createSignal, onMount, createEffect, type Component, type JSX } from 'solid-js';

interface Props {
  initValue: number;
  children?: JSX.Element;
}

export const Counter: Component<Props> = (props) => {
  // Clave para persistencia en localStorage
  const STORAGE_KEY = 'astro-counter-value';
  
  // Función para obtener valor inicial SOLO desde localStorage
  const getStoredValue = (): number | null => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) {
        const parsedValue = parseInt(stored, 10);
        if (!isNaN(parsedValue)) {
          return parsedValue;
        }
      }
    } catch (error) {
      console.error('Error loading counter from localStorage:', error);
    }
    return null;
  };

  // Inicializar con localStorage si existe, sino con initValue
  const initializeValue = (): number => {
    const stored = getStoredValue();
    if (stored !== null) {
      console.log('🔄 Inicializando con valor de localStorage:', stored);
      return stored;
    }
    console.log('🆕 Inicializando con valor por defecto:', props.initValue);
    return props.initValue;
  };

  // Usar el valor correcto desde el inicio
  const [counter, setCounter] = createSignal(initializeValue());
  const [isReady, setIsReady] = createSignal(false);

  // Al montar, marcar como listo
  onMount(() => {
    console.log('🏝️ Counter montado con valor final:', counter());
    setIsReady(true);
    
    // Escuchar cambios desde otras instancias
    const handleCounterChanged = (e: CustomEvent) => {
      const newValue = e.detail.value;
      if (newValue !== counter()) {
        console.log('🔄 Sincronizando counter desde evento externo:', newValue);
        setCounter(newValue);
      }
    };

    // Escuchar cambios desde otras pestañas/ventanas
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY && e.newValue !== null) {
        const newValue = parseInt(e.newValue, 10);
        if (!isNaN(newValue) && newValue !== counter()) {
          console.log('🔄 Sincronizando counter desde localStorage externo:', newValue);
          setCounter(newValue);
        }
      }
    };

    window.addEventListener('counterChanged', handleCounterChanged as EventListener);
    window.addEventListener('storage', handleStorageChange);

    // Cleanup
    return () => {
      window.removeEventListener('counterChanged', handleCounterChanged as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  });

  // Efecto para guardar en localStorage cuando cambia el valor (solo después de montar)
  createEffect(() => {
    if (isReady()) {
      const currentValue = counter();
      localStorage.setItem(STORAGE_KEY, currentValue.toString());
      console.log('💾 Counter guardado en localStorage:', currentValue);
      
      // Disparar evento personalizado para sincronización
      window.dispatchEvent(new CustomEvent('counterChanged', {
        detail: { value: currentValue }
      }));
    }
  });

  const increment = () => {
    const newValue = counter() + 1;
    setCounter(newValue);
    console.log('➕ Counter incrementado a:', newValue);
  };

  const decrement = () => {
    const newValue = counter() - 1;
    setCounter(newValue);
    console.log('➖ Counter decrementado a:', newValue);
  };

  const reset = () => {
    setCounter(props.initValue);
    console.log('🔄 Counter reseteado al valor inicial:', props.initValue);
  };

  return (
    <>
      {props.children}

      <div class="bg-slate-800 p-4 rounded-lg border border-slate-600">
        <h3 class="text-xl mb-4">
          Value: <span class="text-blue-400 font-bold text-2xl">{counter()}</span>
        </h3>

        <div class="space-x-2 mb-4">
          <button
            onClick={increment}
            class="bg-blue-500 hover:bg-blue-600 p-3 rounded transition-colors min-w-[60px] font-bold"
          >
            +1
          </button>
          <button
            onClick={decrement}
            class="bg-red-500 hover:bg-red-600 p-3 rounded transition-colors min-w-[60px] font-bold"
          >
            -1
          </button>
          <button
            onClick={reset}
            class="bg-gray-500 hover:bg-gray-600 px-4 py-3 rounded transition-colors text-sm"
          >
            Reset
          </button>
        </div>
        
        <div class="text-xs text-gray-400 space-y-1">
          <p>💾 Estado persistido en localStorage</p>
          <p>🔄 Sincronizado entre páginas y pestañas</p>
          <p class="text-green-400">✅ Cargado con client:only (sin hidratación)</p>
          <p class="text-blue-300">🎯 Valor inicial: {props.initValue}</p>
        </div>
      </div>
    </>
  );
};
