/* Hesap Makinasi Sinif*/
class Calculator {
    
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    //  "0" == 0 dogru sadece icerige bakar    "0"===0 yanlis tipinede bakar
    //ekleme yapar
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString() // 123
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText =
            this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
                `${this.getDisplayNumber(this.previousOperand)} ${this.operation}` // 5.2+
        } else {
            this.previousOperandTextElement.innerText = '' 
        }
    }

    //Su anda gorunen isim numaraya gore
    getDisplayNumber(number) {
        const stringNumber = number.toString() // "5.2 . 5"
        const integerDigits = parseFloat(stringNumber.split('.')[0]) // 5
        const decimalDigits = stringNumber.split('.')[1] // 2
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}` // 5.2
        } else {
            return integerDisplay // 5
        }
    }

    //islemi sec burda
    chooseOperation(operation) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    // 4 islemi yap
    compute() {
        let computation
        const prev = parseFloat(this.previousOperand) // 2
        const current = parseFloat(this.currentOperand) // 4
        if (isNaN(prev) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = prev + current // 6
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '/':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    //icerigi temizle
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
    }

    //Temizle
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1) // sondaki degeris sil 12
    }
}

/*Degerlerin tanimlanmasi DOM */
const numberButtons = document.querySelectorAll('[data-number]') // 1 2 3 
const operationButtons = document.querySelectorAll('[data-operation]') //
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})