import { NavigationContainerRef, NavigationProp, ParamListBase } from '@react-navigation/native'
import React, { createRef } from 'react'

export const navigationRef = createRef<NavigationContainerRef>()

export function Navigate(name: string, params: any){
    navigationRef.current?.navigate(name, params)
}