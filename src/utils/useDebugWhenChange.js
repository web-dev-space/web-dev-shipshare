import React, { useEffect } from 'react';

const useDebugWhenChange = (name, variable) => {
  useEffect(() => {
    console.log(`"${name}" changed. Value:`, variable);
  }, [variable]);
}

export default useDebugWhenChange;
