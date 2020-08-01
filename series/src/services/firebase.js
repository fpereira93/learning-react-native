import firebase from 'firebase';

const services = {
    initialize: () => {
        const firebaseConfig = {
            apiKey: "AIzaSyDBylgZ73Zkd0jCAnTVlr1RKTNHUa2At_w",
            authDomain: "series-336ac.firebaseapp.com",
            databaseURL: "https://series-336ac.firebaseio.com",
            projectId: "series-336ac",
            storageBucket: "series-336ac.appspot.com",
            messagingSenderId: "154355913326",
            appId: "1:154355913326:web:3c610be4799c0576d5cc7f",
        };

        firebase.initializeApp(firebaseConfig);
    },

    authErrorMessage: (code) => {
        return ({
            'auth/invalid-email': 'e-mail inválido',
            'auth/user-disabled': 'Usuário desabilitado ou excluido',
            'auth/user-not-found': 'Usuário não encontrado',
            'auth/wrong-password': 'Senha inválida',
        })[code]
    },
    auth: (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    },

    registerErrorMessage: (code) => {
        return ({
            'auth/email-already-in-use': 'e-mail já está em uso',
            'auth/invalid-email': 'e-mail inválido',
            'auth/operation-not-allowed': 'Operação inválida',
            'auth/weak-password': 'Senha não é forte suficiente',
        })[code]
    },
    register: (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
    },

    onAuthStateChanged: (next) => {
        return firebase.auth().onAuthStateChanged(next)
    },

    signOut: () => {
        return firebase.auth().signOut();
    },

    currentUser: () => {
        return firebase.auth().currentUser;
    },

    seriesDb: (serieId = null) => {
        const user = services.currentUser();

        const path = serieId ? `users/${user.uid}/series/${serieId}` : `users/${user.uid}/series`;

        return firebase.database().ref(path);
    }
}

export default services;