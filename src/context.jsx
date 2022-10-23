import React, { useContext, useReducer, useEffect } from 'react';
import reducer from './reducer';

const AppContext = React.createContext();

const intialState = {
  name: '',
  image: '',
  services: []
};

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, intialState);

  const updateHomePage = () => {
    return dispatch({
      type: 'HOME_UPDATE',
      payload: {
        name: 'Full Stack Developer',
        image: './images/hero.svg'
      }
    });
  };

  const udpateAboutPage = () => {
    return dispatch({
      type: 'ABOUT_UPDATE',
      payload: {
        name: 'AM Antor',
        image: './images/about1.svg'
      }
    });
  };

  //  to get the api data
  const getServices = async () => {
    try {
      const res = await fetch('services.json');
      const data = await res.json();
      dispatch({ type: 'GET_SERVICES', payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  // to call the api
  useEffect(() => {
    getServices('services.json');
  }, []);

  return (
    <AppContext.Provider value={{ ...state, updateHomePage, udpateAboutPage }}>
      {children}
    </AppContext.Provider>
  );
};

// gloabal custom hook
const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
