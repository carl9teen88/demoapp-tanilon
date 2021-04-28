export class User {
    constructor(
        public _id?: string, 
        public usr_email?: string,
        public usr_fullname?: string,
        public usr_address?: string,
        public updated_at?: Date) {}
}