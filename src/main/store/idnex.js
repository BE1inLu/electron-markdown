import store from 'electron-store'

export function storefunc(){
    const localstore=new store();
    return localstore
}