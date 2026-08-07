export interface BusinessInsight{

id:string;

title:string;

description:string;

severity:

|"low"

|"medium"

|"high";

category:

|"sales"

|"finance"

|"inventory"

|"customers";

recommendation:string;

}