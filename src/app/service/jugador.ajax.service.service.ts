import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IJugador, IJugadorPage } from '../model/model.interfaces';
import { API_URL } from 'src/environment/environment';

@Injectable()
export class JugadorAjaxService {

    sUrl: string = API_URL + "/jugador";

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<IJugador> {
        return this.oHttpClient.get<IJugador>(this.sUrl + "/" + id);
    }

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, equipo_id: number | undefined): Observable<IJugadorPage> {
        if (!size) size = 10;
        if (!page) page = 0;
    
        let strUrlParams = `?size=${size}&page=${page}&sort=${orderField},${orderDirection}`;
    
        if (equipo_id !== undefined && equipo_id > 0) {
            strUrlParams += `&equipo_id=${equipo_id}`;
        }
    
        return this.oHttpClient.get<IJugadorPage>(this.sUrl + strUrlParams);
    }
    

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oJugador: IJugador): Observable<IJugador> {
        return this.oHttpClient.post<IJugador>(this.sUrl, oJugador);
    }

    updateOne(oJugador: IJugador): Observable<IJugador> {
        return this.oHttpClient.put<IJugador>(this.sUrl, oJugador);
    }

    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
    }

    empty(): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/empty");
    }
    
}
