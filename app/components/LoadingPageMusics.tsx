import { View, Text } from 'react-native'
import { Skeleton } from '@rneui/themed';
import React from 'react'

export function LoadingPageMusics() {
  return (
    <Skeleton
      animation="wave"
      width={80}
      height={40}
    />
  );
}
