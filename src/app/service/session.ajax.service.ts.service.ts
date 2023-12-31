import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { API_URL } from 'src/environment/environment';
import { IToken, IJugador, SessionEvent } from '../model/model.interfaces';
import { JugadorAjaxService } from './jugador.ajax.service.service';


@Injectable()
export class SessionAjaxService {

    sUrl: string = API_URL + "/session";

    subjectSession = new Subject<SessionEvent>();

    constructor(
        private oHttpClient: HttpClient,
        private oJugadorAjaxService: JugadorAjaxService
    ) { }

    private parseJwt(token: string): IToken {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }

    login(sUsername: string, sPassword: string): Observable<string> {
        //const sUser: string = JSON.stringify({ username: sUsername, password: sPassword });
        return this.oHttpClient.post<string>(this.sUrl, { username: sUsername, password: sPassword });
    }

    setToken(sToken: string): void {
        localStorage.setItem('token', sToken);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    logout(): void {
        localStorage.removeItem('token');
    }

    isSessionActive(): Boolean {
        //pte comprobar que el token no está caducado
        return this.getToken() != null;
    }

    getUsername(): string {
        if (this.isSessionActive()) {
            let token: string | null = localStorage.getItem('token');
            if (!token) {
                return "";
            } else {
                return this.parseJwt(token).name;
            }
        } else {
            return "";
        }
    }

    on(): Observable<SessionEvent> {
        return this.subjectSession.asObservable();
    }

    emit(event: SessionEvent) {
        this.subjectSession.next(event);
    }

    getSessionUser(): Observable<IJugador> | null {
        if (this.isSessionActive()) {
            return this.oJugadorAjaxService.getByUsername(this.getUsername())
        } else {
            return null;
        }
    }

}
