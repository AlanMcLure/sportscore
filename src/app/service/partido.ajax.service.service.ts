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

    getPage(size: number | undefined, page: number | undefined, orderField: string, orderDirection: string, id_partido: number): Observable<IPartidoPage> {
        if (!size) size = 10;
        if (!page) page = 0;
        let strUrlPartido = "";
        if (id_partido > 0) {
            strUrlPartido = "&partido=" + id_partido;
        }
        return this.oHttpClient.get<IPartidoPage>(this.sUrl + "?size=" + size + "&page=" + page + "&sort=" + orderField + "," + orderDirection + strUrlPartido);
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
}
