import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})

export class FormComponent implements OnInit {
  passwordStateClass = "";
  message = "";
  passwordValue = "";
  passwordVisible = false;

  ngOnInit() {
    this.passwordValue = "";
    this.checkPasswordValue();
  }

  toggleVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  inputHandler(event: Event) {
    this.passwordValue = (event.target as HTMLInputElement).value;
    this.checkPasswordValue();
  }

  checkPasswordValue() {
    const passwordValue = this.passwordValue;

    if (passwordValue.length <= 0) {
      this.passwordStateClass = "empty";
      this.message = "";
    } else if (passwordValue.length < 8) {
      this.passwordStateClass = "incorrect";
      this.message = "Password has less than 8 characters!";
    } else {
      const hasLetters = new RegExp(/[a-zA-Z]/).test(passwordValue);
      const hasNumbers = new RegExp(/\d+/).test(passwordValue);
      const hasSymbols = new RegExp(/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/).test(passwordValue);

      const completedTests = [hasLetters, hasNumbers, hasSymbols].filter((item) => item);
      const baseMessage = "Password is "

      switch (completedTests.length) {
        case 1:
          this.passwordStateClass = "easy";
          this.message = baseMessage + "easy";
          break;
        case 2:
          this.passwordStateClass = "middle";
          this.message = baseMessage + "middle";
          break;
        default:
          this.passwordStateClass = "strong";
          this.message = baseMessage + "strong";
      }
    }
  }
}
