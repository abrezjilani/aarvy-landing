import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('invite') invite: any;
  @ViewChild('appointment') appointment: any;
  quote: string | undefined;
  isLoading = false;
  currentDate: any = new Date();

  constructor(private modalService: NgbModal, private store: AngularFirestore) {}

  ngOnInit() {}

  validateForm1() {
    var mail = (document.getElementById('email1') as HTMLInputElement).value;
    if (this.isValidEmail(mail)) {
      (document.getElementById('emailLabel') as HTMLLabelElement).classList.remove('invalid-error');
      this.modalService.dismissAll('Form Submitted');
      this.modalService.open(this.invite, { windowClass: 'dark-modal', centered: true });
      this.store
        .collection('inviteList')
        .add({ email: mail })
        .then((docRef) => {
          console.log('document written with id ' + docRef.id);
        })
        .catch((err) => {
          console.log('error: writing error ' + err);
        });
      return true;
    } else {
      (document.getElementById('emailContainer') as HTMLDivElement).classList.add('invalid');
      (document.getElementById('emailLabel') as HTMLLabelElement).classList.add('invalid-error');
      return false;
    }
  }

  checkDateFormat() {
    var date = (document.getElementById('inputDate') as HTMLInputElement).value;
    console.log(typeof date);
    var time = (document.getElementById('inputTime') as HTMLInputElement).value;
    console.log(time);
  }

  validateForm2() {
    var firstName = (document.getElementById('inputFirstName') as HTMLInputElement).value;
    if (this.isValidName(firstName)) {
      (document.getElementById('fNameContainer') as HTMLDivElement).classList.remove('invalid');

      var lastName = (document.getElementById('inputLastName') as HTMLInputElement).value;
      if (this.isValidName(lastName)) {
        (document.getElementById('lNameContainer') as HTMLDivElement).classList.remove('invalid');
        var contact = (document.getElementById('inputContact') as HTMLInputElement).value;
        if ((contact.length == 0 || (contact.length < 13 && contact.length > 9)) && !Number.isNaN(contact)) {
          (document.getElementById('contactContainer') as HTMLDivElement).classList.remove('invalid');

          var date = (document.getElementById('inputDate') as HTMLInputElement).value;
          var time = (document.getElementById('inputTime') as HTMLInputElement).value;
          if (date) {
            (document.getElementById('dateContainer') as HTMLDivElement).classList.remove('invalid');

            if (time) {
              (document.getElementById('timeContainer') as HTMLDivElement).classList.remove('invalid');
              this.modalService.dismissAll('Form Submitted');
              this.modalService.open(this.appointment, { windowClass: 'dark-modal', centered: true });
              this.store
                .collection('appointments')
                .add({
                  firstName: firstName,
                  lastName: lastName,
                  contact: contact,
                  preferredDate: date,
                  preferredTime: time,
                })
                .then((docRef) => {
                  console.log('document written with id ' + docRef.id);
                })
                .catch((err) => {
                  console.log('error: writing error ' + err);
                });
            } else {
              (document.getElementById('timeContainer') as HTMLDivElement).classList.add('invalid');
              return false;
            }
          } else {
            (document.getElementById('dateContainer') as HTMLDivElement).classList.add('invalid');
            return false;
          }
          this.modalService.dismissAll('Form Submitted');
          this.modalService.open(this.appointment, { windowClass: 'dark-modal', centered: true });
          this.store
            .collection('appointments')
            .add({
              firstName: firstName,
              lastName: lastName,
              contact: contact,
              preferredDate: date,
              preferredTime: time,
            })
            .then((docRef) => {
              console.log('document written with id ' + docRef.id);
            })
            .catch((err) => {
              console.log('error: writing error ' + err);
            });

          // this.modalService.dismissAll('Form Submitted');
          // this.modalService.open(this.thankyou, { windowClass: 'dark-modal', centered: true });
          return true;
        } else (document.getElementById('contactContainer') as HTMLDivElement).classList.add('invalid');
        return false;
      } else {
        (document.getElementById('lNameContainer') as HTMLDivElement).classList.add('invalid');
        return false;
      }
    } else {
      (document.getElementById('fNameContainer') as HTMLDivElement).classList.add('invalid');
      return false;
    }
  }

  isValidEmail(mail: any) {
    if (mail.length == 0) return false;
    return /^\w+[-\.\w]*@(\w+[-\.\w]*?\.\w{2,4})$/.exec(mail);
  }

  isValidName(name: any) {
    if (name.length == 0) return false;
    return /^[A-z ]+$/.test(name);
  }

  open() {
    this.modalService.open(this.invite, { windowClass: 'dark-modal', centered: true });
  }
}
