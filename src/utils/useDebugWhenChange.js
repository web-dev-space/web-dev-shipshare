import React, { useEffect } from 'react';

const useDebugWhenChange = (name, variable) => {
  useEffect(() => {
    console.debug(`"${name}" changed. Value:`, variable);
  }, [variable]);
}

export default useDebugWhenChange;
