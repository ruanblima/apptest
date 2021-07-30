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
        'https://raw.githubusercontent.com/mikehardy/react-native-update-apk/master/example/test-version.json',

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
          'Update Available',
          'New version released, do you want to update? ' +
            '(TESTING NOTE 1: stop your dev package server now - or the test package will try to load from it ' +
            'instead of the included bundle leading to Javascript/Native incompatibilities.' +
            'TESTING NOTE 2: the version is fixed at 1.0 so example test updates always work. ' +
            'Compare the Last Update Times to verify it installed)',
          [
            {text: 'Cancel', onPress: () => {}},

            {text: 'Update', onPress: () => performUpdate(true)},
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
      <S.Text>Aplicação 2.0</S.Text>

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
