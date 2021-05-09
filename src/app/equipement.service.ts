import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipement } from './equipement';


@Injectable({
  providedIn: 'root'
})
export class EquipementService {
  private baseURL = "https://p2slinkbackend.herokuapp.com/api/auth/equipements";
  private baseURLs = "https://p2slinkbackend.herokuapp.com/api/auth/equipements/site";

  constructor(private httpclient:HttpClient) { }

  getEquipementList(): Observable<Equipement[]> {
    return this.httpclient.get<Equipement[]>(`${this.baseURL}`);

  }
  getEquipwithouSiteList(): Observable<Equipement[]> {
    return this.httpclient.get<Equipement[]>(`${this.baseURLs}`,);
  }
  createEquipement(equipement: Equipement): Observable<Object>{
    return this.httpclient.post(`${this.baseURL}`, equipement);
  }


  getEquipementById(id:number): Observable<Equipement>{
    return this.httpclient.get<Equipement>(`${this.baseURL}/${id}`);
  }

  addCarte(idEquip: number , idCarte: number , equipement: Equipement ): Observable<Object>{
    return this.httpclient.post<Equipement>(`${this.baseURL}/${idEquip}/${idCarte}`, equipement );

  }

  updateEquipement(id: number , equipement:Equipement):Observable<Object>{
    return this.httpclient.put(`${this.baseURL}/${id}`, equipement);
  }

  deleteEquipement(id:number):Observable<Object>{
    return this.httpclient.delete(`${this.baseURL}/${id}`);
  }
}
