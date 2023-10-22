import firebase from 'firebase/firestore';
import { firestore } from 'firebase-admin';
import { DocumentData, DocumentReference, Firestore } from 'firebase/firestore';

export interface IMedic {
    nome: string;
    type: string;
    userId: string;
}

export interface IMedicAddType {
    user?: firebase.DocumentReference
    nome: string;
    type: string;
}

export interface IMedicGetType {
    user: firebase.DocumentReference
    nome: string;
    type: string;
    id: string;
    laboratorio: string;
    indicacao: string;
    substancia: string;
    tarja: string;
    apresentacao: string;
    descricao: string;
    currency: string;
    value: number;
    atualizado: string;
    uid: string
}

export interface IUser {
    age: number;
    firstname: string;
    lastname: string;
    type: string;
    uid: string;
}