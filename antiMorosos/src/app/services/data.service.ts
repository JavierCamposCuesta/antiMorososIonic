import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData, addDoc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface Message {
  fromName: string;
  subject: string;
  date: string;
  id: number;
  read: boolean;
}

export interface Moroso {
  id?: string;
  nombre: string;
  cantidad: number;
  telefono: string;
  fechaPrestamo: string;
  fechaCobro: string
  descripcion: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public messages: Message[] = [
    {
      fromName: 'Matt Chorsey',
      subject: 'New event: Trip to Vegas',
      date: '9:32 AM',
      id: 0,
      read: false
    },
    {
      fromName: 'Lauren Ruthford',
      subject: 'Long time no chat',
      date: '6:12 AM',
      id: 1,
      read: false
    },
    {
      fromName: 'Jordan Firth',
      subject: 'Report Results',
      date: '4:55 AM',
      id: 2,
      read: false
    },
    {
      fromName: 'Bill Thomas',
      subject: 'The situation',
      date: 'Yesterday',
      id: 3,
      read: false
    },
    {
      fromName: 'Joanne Pollan',
      subject: 'Updated invitation: Swim lessons',
      date: 'Yesterday',
      id: 4,
      read: false
    },
    {
      fromName: 'Andrea Cornerston',
      subject: 'Last minute ask',
      date: 'Yesterday',
      id: 5,
      read: false
    },
    {
      fromName: 'Moe Chamont',
      subject: 'Family Calendar - Version 1',
      date: 'Last Week',
      id: 6,
      read: false
    },
    {
      fromName: 'Kelly Richardson',
      subject: 'Placeholder Headhots',
      date: 'Last Week',
      id: 7,
      read: false
    }
  ];

  constructor(private firestore: Firestore) { }

  public getMessages(): Message[] {
    return this.messages;
  }

  public getMessageById(id: number): Message {
    return this.messages[id];
  }


  //Metodos firebase

  getMorosos(): Observable<Moroso[]> {
    const morosoRef = collection(this.firestore, 'moroso');
    return collectionData(morosoRef, { idField: 'id'}) as Observable<Moroso[]>;
  }
 
  getMorosoById(id): Observable<Moroso> {
    const morosoDocRef = doc(this.firestore, `moroso/${id}`);
    return docData(morosoDocRef, { idField: 'id' }) as Observable<Moroso>;
  }
 
  addMoroso(moroso: Moroso) {
    const morosoRef = collection(this.firestore, 'moroso');
    return addDoc(morosoRef, moroso);
  }
 
  deleteMoroso(moroso: Moroso) {
    const MorosoDocRef = doc(this.firestore, `moroso/${moroso.id}`);
    return deleteDoc(MorosoDocRef);
  }
 
  updateMoroso(moroso: Moroso) {
    const morosoDocRef = doc(this.firestore, `moroso/${moroso.id}`);
    return updateDoc(morosoDocRef, { nombre: moroso.nombre,
       cantidad: moroso.cantidad,
       telefono: moroso.telefono,
       fechaPrestamo: moroso.fechaPrestamo,
       fechaCobro: moroso.fechaCobro,
       descripcion: moroso.descripcion
  })
}
}
