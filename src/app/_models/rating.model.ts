import { TrustedString } from "@angular/core/src/sanitization/bypass";

export class Rating {
    id: number;
    star: number;
    review: String;
    doctor_id: number;
    patient_id: number;
    patient_name : String;
    created_at : Date;
    report : boolean;
}

