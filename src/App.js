import { Provider } from 'react-redux';
import Body from './components/Body';
import appStore from './redux/appStore';
import { useEffect } from 'react';
import { generateToken, messaging } from './firebase/firebase';
import { onMessage } from 'firebase/messaging';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  useEffect(() => {
    generateToken();
    onMessage(messaging, (payload) => {
      toast(payload.notification.body)
    })
  }, []); 

  return (
    <Provider store={appStore}>
      <Body />
      <Toaster
        containerStyle={{
          position: 'top-right',
        }}
      />
    </Provider>
  );
}

export default App;
