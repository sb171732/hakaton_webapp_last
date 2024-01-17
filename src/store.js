import Vue from 'vue'
import Vuex from 'vuex'
import { vuexfireMutations, firestoreAction, firebaseAction } from 'vuexfire'
import { db } from './db'
import firebase from 'firebase/app'
import fb from 'firebase'

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        food_provider:[],  // переменные , данные , состояние 
        teachers:[],
        subCollection: [],
        menu:[],
        menu_model:[],
        admin:[],
        userList:[],
        orsersList:[],
        user:null
    },
    mutations: {
        ...vuexfireMutations,  // мутации изменяют state если происходят action
        SET_USER(state, user) {
            state.user = user
          },
        SET_SubMenu(state, smenu) {
            state.subCollection = smenu
          },
        SET_USERS_LIST(state, userList) {
            state.userList = userList
          }
    },
    actions: {
      bindSubCollection: firestoreAction(({ bindFirestoreRef },payload) => {
        // Replace 'collectionId' and 'subCollectionId' with your actual collection and sub-collection IDs respectively
        return bindFirestoreRef('subCollection', db.collection('menu').doc(payload).collection('menu'))
      }),
        bindOrder: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('orderList', db.collection('orders'))
        }), // 
        bindMenuModel: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('menu_model', db.collection('menu_model'))
        }), // 
        bindMenu: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('menu', db.collection('menu'))
        }), // 
        bindTeachers: firestoreAction(({ bindFirestoreRef }) => {
            return bindFirestoreRef('teachers', db.collection('teachers'))
        }), // 
        // Firestore.instance.collection('users').document(user.uid)
        // .collection('votes').document(vote)
        // .setData({/* ... */});
        addSubMenu: firestoreAction((context, {id,payload}) => {
            return db.collection('menu').doc(id).collection('menu').
            add(payload)
        }),
        addFP: firestoreAction((context, payload) => {
            return db.collection('foodprovider').add(payload)
        }),
        addMenu: firestoreAction((context, payload) => {
            return db.collection('menu').add(payload)
        }),
        addMenuModel: firestoreAction((context, payload) => {
            return db.collection('menu_model').add(payload)
        }),
        saveR: firestoreAction((context, payload) => {
            return db.collection('rezult_zagadki').add(payload)
        }),
        delMenu: firestoreAction((context, payload) => {
            return db.collection('menu').doc(payload).delete()
        }),
        delMenuModel: firestoreAction((context, payload) => {
            return db.collection('menu_model').doc(payload).delete()
        }),
        delSubMenu: firestoreAction((context, {docId, subdocID}) => {
            return db.collection('menu').doc(docId)
            .collection('menu').doc(subdocID)
            .delete()
        }),
        updateMenuModel: firestoreAction((context, {id, doc}) => {
            db.collection('menu_model')
                .doc(id)
                .update(doc)
        }),
        updateZag: firestoreAction((context, {id, doc}) => {
            db.collection('zagadki')
                .doc(id)
                .update(doc)
        }),
       async signIn(context,{email, password}){
          console.log(email)
          console.log(password)
          const promise = await fb.auth().createUserWithEmailAndPassword(email, password);
          if (promise){
            store.commit('SET_USER', promise.user)
          } else{
            throw new Error('error')
          }
        },
       async login(context,{email, password}){
          console.log(email)
          console.log(password)
          const promise = await fb.auth().signInWithEmailAndPassword(email, password);
          if (promise){
            store.commit('SET_USER', promise.user)
          } else{
            throw new Error('error')
          }
        },
        async signout(){
          fb.auth().signOut();
          store.commit('SET_USER',null)
        }
        
        ,
        async emailverif(){
          store.state.user.sendEmailVerification()
        },
        getUsersList({ commit }) {
          // Получить список пользователей Firebase Auth
          fb.auth().listUsers().then((userList) => {
            // Передать список пользователей в мутацию
            commit('SET_USERS_LIST', userList);
          }).catch((error) => {
            console.log(error);
          });
        },
        
        setUserRef: firebaseAction(({ bindFirebaseRef }, ref) => {
            bindFirebaseRef('user', ref)
          }),
          getLoginStatus({commit}){
            let vm = this
            firebase.auth().onAuthStateChanged(function(user) {
              if (user) {
                vm.user = user
                commit('SET_USER',user)
                console.log("// User is signed in by email : ", user.email)
              } else {
                vm.user = null
                console.log("// No user is signed in.")
              }
            });
       },
       initFirebase(){
        //  const firebaseApp =
          firebase.initializeApp({
            apiKey: "AIzaSyCIEFmPlF4vIrtJ901tA0SxfWVzkiyQDxI",
            authDomain: "hackaton-4f772.firebaseapp.com",
            projectId: "hackaton-4f772",
            storageBucket: "hackaton-4f772.appspot.com",
            messagingSenderId: "12414139549",
            appId: "1:12414139549:web:255d0a1e8e4063c9fda874",
            measurementId: "G-TCZZQXYEB8"
          });
        },
    }
})



store.dispatch('bindMenuModel')
store.dispatch('bindOrder')
store.dispatch('bindMenu')