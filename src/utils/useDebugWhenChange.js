import React, { useEffect } from 'react';

const useDebugWhenChange = (variable, name) => {
  useEffect(() => {
    console.debug(`"${name}" changed. Value:`, variable);
  }, [variable]);
}

export default useDebugWhenChange;
