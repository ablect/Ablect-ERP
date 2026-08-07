export interface JournalEntry{

id:string;

journalNumber:string;

date:string;

reference:string;

description:string;

status:
|"Draft"
|"Posted";

}