import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPartido, IPartidoPage } from '../model/model.interfaces';
import { API_URL } from 'src/environment/environment';

@Injectable()
export class PartidoAjaxService {

    sUrl: string = API_URL + "/partido";

    constructor(
        private oHttpClient: HttpClient
    ) { }

    getOne(id: number): Observable<IPartido> {
        return this.oHttpClient.get<IPartido>(this.sUrl + "/" + id);
    }

    // No se si aqui puede afectar la logica de las urls (ver si se filtraria por equipo, o por local y visitante)
    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, equipoId: number): Observable<IPartidoPage> {
        
        if (!size) size = 10;
        if (!page) page = 0;

        let strUrlParams = `?size=${size}&page=${page}&sort=${orderField},${orderDirection}`;

        if (equipoId !== undefined && equipoId > 0) {
            strUrlParams += `&equipo=${equipoId}`;
        }

        return this.oHttpClient.get<IPartidoPage>(this.sUrl + strUrlParams);
    }

    removeOne(id: number | undefined): Observable<number> {
        if (id) {
            return this.oHttpClient.delete<number>(this.sUrl + "/" + id);
        } else {
            return new Observable<number>();
        }
    }

    newOne(oPartido: IPartido): Observable<IPartido> {
        return this.oHttpClient.post<IPartido>(this.sUrl, oPartido);
    }

    updateOne(oPartido: IPartido): Observable<IPartido> {
        return this.oHttpClient.put<IPartido>(this.sUrl, oPartido);
    }

    generateRandom(amount: number): Observable<number> {
        return this.oHttpClient.post<number>(this.sUrl + "/populate/" + amount, null);
    }

    empty(): Observable<number> {
        return this.oHttpClient.delete<number>(this.sUrl + "/empty");
    }
    
}
