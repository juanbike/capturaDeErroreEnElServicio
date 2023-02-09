import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produtcs } from '../models/produtcs';
import {  throwError } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:3000/products";


  constructor(private httpClient: HttpClient) { }

  public first: string = "";
  public prev: string = "";
  public next: string = "";
  public last: string = "";



  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(): Observable<Produtcs[]>{
    // implementar la paginación en nuestra aplicación
    const options = { params: new HttpParams({fromString: "_page=1&_limit=20"}) };
    return this.httpClient.get<Produtcs[]>(this.REST_API_SERVER, options).pipe(retry(3), catchError(this.handleError));
  }
}

/*
https://www.techiediaries.com/angular-12-tutorial-example-rest-crud-http-get-httpclient/
----------------------------------------------------------------------------------------

Hay dos tipos de errores en las aplicaciones front-end:

	1-Errores del lado del cliente, como problemas de red y sintaxis de JavaScript y errores de tipo. 
		Estos errores devuelven objetos ErrorEvent.
		
	2- Errores del lado del servidor, como errores de código en el servidor y errores de acceso a la base de datos. 
		Estos errores devuelven respuestas de error HTTP.
		
	Los métodos HttpClient de Angular se pueden usar fácilmente con el operador catchError() de RxJS, ya que devuelven Observables,
	a través del método pipe() para capturar y manejar errores. Simplemente necesitamos definir un método para manejar los errores
	dentro de su servicio.	
	
	Simplemente necesitamos verificar si un error es una instancia del objeto ErrorEvent para obtener el tipo de error para que
	podamos manejarlo adecuadamente.
*/

