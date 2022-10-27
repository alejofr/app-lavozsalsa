export interface User {
    _id: string;
    email: string;
    userName: string | null;
    roles: string;
    perfilUrl?: string | null;
}


export interface UserInfo extends User {
    first_name:     string;
    password:       string;
    second_name:    string;
    website:        string;
}

export interface EditUser {
    email: string;
    userName: string | null;
    first_name:     string;
    second_name:    string;
    password:       string;
    confirmPassword?: string;
}