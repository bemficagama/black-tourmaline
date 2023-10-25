import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Age } from './age';

@Injectable()
export class AgeService {

    constructor(
        private http: HttpClient
    ) { }

    getAges(): Observable<Array<Age> | null> {
        return this.http.get<Array<Age>>(`${environment.api}/ages`)
            .pipe(catchError((error: HttpErrorResponse) => {
                let msg: string
                if (error.error instanceof ErrorEvent) {
                    // Erro de client-side ou de rede
                    msg = error.error.message
                    console.error('Ocorreu um erro:', error.error.message);
                } if (error.status == 0) {
                    msg = "Sem comunicação com o servidor"
                    console.error(
                        `Código do erro ${error.status}, ` +
                        `Erro: ${msg}`);
                } else {
                    // Erro retornando pelo backend
                    msg = JSON.stringify(error.error.status)
                    console.error(
                        `Código do erro ${error.status}, ` +
                        `Erro: ${JSON.stringify(error.error)}`);
                }
                // retornar um observable com uma mensagem amigavel.
                return throwError(`CARREGAR: ${msg}`);
            }));
    }
}