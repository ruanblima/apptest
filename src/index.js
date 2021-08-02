import React, {useEffect, useState, useRef} from 'react';
import {Alert} from 'react-native';
import * as UpdateAPK from 'rn-update-apk';

import * as S from './styles';

const Home = () => {
  const [downloadProgress, setDownloadProgress] = useState(0);

  const updater = useRef(null);

  const setUpdater = () => {
    updater.current = new UpdateAPK.UpdateAPK({
      iosAppId: '1104809018',
      apkVersionUrl:
        'https://raw.githubusercontent.com/ruanblima/apptest/master/src/json/testVersion.json',

      apkVersionOptions: {
        method: 'GET',
        headers: {},
      },

      apkOptions: {
        headers: {},
      },

      fileProviderAuthority: 'com.apptest.provider',

      needUpdateApp: performUpdate => {
        Alert.alert(
          'Atualização disponível',
          'Nova atualização de teste disponível, deseja atualizar ?',
          [
            {text: 'Cancel', onPress: () => {}},

            {text: 'Atualizar', onPress: () => performUpdate(true)},
            ,
          ],
        );
      },

      forceUpdateApp: () => {
        console.log('forceUpdateApp callback called');
      },

      notNeedUpdateApp: () => {
        console.log('notNeedUpdateApp callback called');
      },

      downloadApkStart: () => {
        console.log('downloadApkStart callback called');
      },

      downloadApkProgress: progress => {
        console.log(`downloadApkProgress callback called - ${progress}%...`);

        setDownloadProgress(progress);
      },

      downloadApkEnd: () => {
        console.log('downloadApkEnd callback called');
      },

      onError: err => {
        console.log('onError callback called', err);
        Alert.alert('There was an error', err.message);
      },
    });
  };

  useEffect(() => {
    setUpdater();
  }, []);

  const _onCheckServerVersion = () => {
    console.log('checking for update');
    updater.current.checkUpdate();
  };
  return (
    <S.Container>
      <S.Text>Aplicação 1.0.0</S.Text>

      <S.ButtonDownload onPress={() => _onCheckServerVersion()}>
        <S.ButtonText>Atualizar APP</S.ButtonText>
      </S.ButtonDownload>

      {downloadProgress !== -1 && (
        <S.Text>Download Progress: {downloadProgress}%</S.Text>
      )}
    </S.Container>
  );
};

export default Home;
