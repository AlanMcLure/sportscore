export interface Sort {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
}

export interface Pageable {
    sort: Sort;
    offset: number;
    pageNumber: number;
    pageSize: number;
    paged: boolean;
    unpaged: boolean;
}

export interface IPage<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    size: number;
    number: number;
    sort: Sort;
    first: boolean;
    numberOfElements: number;
    empty: boolean;

    strSortField: string;
    strSortDirection: string;
    strFilter: string;
    strFilteredTitle: string;
    strFilteredMessage: string;
    nRecords: number;
}

export interface IEntity {
    id: number;
}

export interface IJugador extends IEntity {
    nombre: string;
    apellido_1: string;
    apellido_2: string;
    nacionalidad: string;
    posicion: string;
    fecha_nacimiento: Date;
    email: string;
    username: string;
    password: string;
    rol: boolean;
    equipo: IEquipo;
}

export interface IJugadorPage extends IPage<IJugador> {
}

export interface IEquipo extends IEntity {
    nombre: string;
    pais_origen: string;
    ciudad_origen: string;
    fecha_fundacion: Date;
    entrenador: string;
}

export interface IEquipoPage extends IPage<IEquipo> {
}

export interface IPartido extends IEntity {
    equipo_local: IEquipo;
    equipo_visitante: IEquipo;
    fecha_partido: Date;
    resultado: string;
}

export interface IPartidoPage extends IPage<IPartido> {
}

export type formOperation = 'EDIT' | 'NEW';

export interface SessionEvent {
    type: string;
}

export interface IToken {
    jti: string;
    iss: string;
    iat: number;
    exp: number;
    name: string;
}
