import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Region } from './region';


@Injectable({
  providedIn: 'root'
})
export class RegionService {

  private baseURL = "https://p2slinkbackend.herokuapp.com/api/auth/region";

  constructor(private httpclient:HttpClient) { }

  getRegionList(): Observable<Region[]> {
    return this.httpclient.get<Region[]>(`${this.baseURL}`);

  }
  createRegion(region: Region): Observable<Object>{
    return this.httpclient.post(`${this.baseURL}`, region);
  }


  getRegionById(id:number): Observable<Region>{
    return this.httpclient.get<Region>(`${this.baseURL}/${id}`);
  }

  addSite(idRegion: number , idSite: number , region: Region ): Observable<Object>{
    return this.httpclient.post<Region>(`${this.baseURL}/${idRegion}/${idSite}`, region );

  }

  updateRegion(id: number , region: Region):Observable<Object>{
    return this.httpclient.put(`${this.baseURL}/${id}`, region);
  }

  deleteRegion(id:number):Observable<Object>{
    return this.httpclient.delete(`${this.baseURL}/${id}`);
  }
}
