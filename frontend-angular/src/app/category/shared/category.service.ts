import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Category } from './category';
import { CategoryRequest } from './categoryRequest';

@Injectable()
export class CategoryService {

    constructor(
        private http: HttpClient
    ) {}

    getCategories(page: number = 1, size: number = 4, search: string = ''): Observable<CategoryRequest | null> {
        return this.http.get<CategoryRequest>(`${environment.api}/categories?page=${page}&size=${size}&search=${search}`)
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

    getMains(): Observable<Category[]| null> {
        return this.http.get<Category[]>(`${environment.api}/categories/mains`)
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

    readById(id: number) {
        return this.http.get<Category>(`${environment.api}/categories/${id}`)
        //.pipe(catchError(this.handleError('category.getById', null)))

    }

    update(category: Category): Observable<Category> {
        return this.http.put<Category>(`${environment.api}/categories/${category.id}`, category)
            .pipe(catchError((error: HttpErrorResponse) => {

                if (error.error instanceof ErrorEvent) {
                    // Erro de client-side ou de rede
                    console.error('Ocorreu um erro:', error.error.message);
                } else {
                    // Erro retornando pelo backend
                    console.error(
                        `Código do erro ${error.status}, ` +
                        `Erro: ${JSON.stringify(error.error)}`);
                }
                // retornar um observable com uma mensagem amigavel.
                return throwError(`ATUALIZAR: ${JSON.stringify(error.error)}`);
            }));
    }

    save(category: Category): Observable<Category> {
        return this.http.post<Category>(`${environment.api}/categories`, category)
            .pipe(catchError((error: HttpErrorResponse) => {

                if (error.error instanceof ErrorEvent) {
                    // Erro de client-side ou de rede
                    console.error('Ocorreu um erro:', error.error.message);
                } else {
                    // Erro retornando pelo backend
                    console.error(
                        `Código do erro ${error.status}, ` +
                        `Erro: ${JSON.stringify(error.error)}`);
                }
                // retornar um observable com uma mensagem amigavel.
                return throwError(`SALVAR: ${JSON.stringify(error.error)}`);
            }));
    }

    deleteCategory(id: number): Observable<unknown> {
        return this.http.delete(`${environment.api}/categories/${id}`)
            .pipe(catchError((error: HttpErrorResponse) => {

                if (error.error instanceof ErrorEvent) {
                    // Erro de client-side ou de rede
                    console.error('Ocorreu um erro:', error.error.message);
                } else {
                    // Erro retornando pelo backend
                    console.error(
                        `Código do erro ${error.status}, ` +
                        `Erro: ${JSON.stringify(error.error)}`);
                }
                // retornar um observable com uma mensagem amigavel.
                return throwError(`DELETE: ${JSON.stringify(error.error)}`);
                `Network Error: ${error.statusText} (${error.status})`
                throwError(`DELETE: ${error.statusText} ${JSON.stringify(error.error)} (Código do Erro: ${error.status})`)
            }));
    }

    getAll(): Observable<Category[] | null> {
        return this.http.get<Category[]>(`${environment.api}/categories/all`)
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
                return throwError(`CARREGAR CATEGORIAS: ${msg}`);
            }));
    }
}