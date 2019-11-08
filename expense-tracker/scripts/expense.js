
class Expense{
    constructor(){
        this.expenseTbody=null;
        this.allExpense=null;
        this.todayExpenses=null;
        this.init();
    }
    init(){
        this.todayExpenses=[];
        this.expenseTbody=document.querySelector('#expenses');
        this.saveExpense= this.saveExpense.bind(this);
        this.createLocalStorage();
        this.updateTodayExpenses();
        this.displayChart();
    }
    createLocalStorage(){
        if(localStorage.getItem('expenses') == null){
            localStorage.setItem('expenses',JSON.stringify([]));
        }
        this.allExpense = JSON.parse(localStorage.getItem('expenses'));
    }
    displayAllExpense(){
        for(let i=0;i<this.allExpense.length;i++){
            let tr=document.createElement('tr');
            addExpenseData(tr,i+1);
            addExpenseData(tr,this.allExpense[i]['title']);
            addExpenseData(tr,this.allExpense[i]['desc']);
            addExpenseData(tr,'Rs.'+this.allExpense[i]['amount']);
            addExpenseData(tr,this.allExpense[i]['date']);
            addDeleteBtn(tr,i,this);

            this.expenseTbody.prepend(tr);
        }
        function addExpenseData(tr,data){
            let td = document.createElement('td');
            td.innerText = data;

            tr.appendChild(td)
        }
        function addDeleteBtn(tr,index,that){
            let td = document.createElement('td');
            let btn=document.createElement('button');
            btn.classList.add('btn');
            btn.classList.add('btn-danger');
            btn.classList.add('btn-xs');
            btn.innerText = 'Delete';
            btn.addEventListener('click',()=> deleteRow(index,that));
            td.appendChild(btn);
            tr.appendChild(td);
        }

        function deleteRow(index,that){
            that.allExpense.splice(index,1);
            localStorage.removeItem('expenses');
            localStorage.setItem('expenses',JSON.stringify(that.allExpense));
            that.updateTodayExpenses();
            that.expenseTbody.innerHTML='';
            that.displayAllExpense();
        }
    }
    saveExpense(e){
        e.preventDefault();
        let modal = document.querySelector('.modal');
        let wrapper = document.querySelector('#wrapper');
        let title = document.querySelector('#title').value;
        let amount = document.querySelector('#amount').value;
        let desc = document.querySelector('#desc').value;
        let date = document.querySelector('#date').value;
        modal.style.display='none';
        wrapper.classList.remove('bg-dark');
        let expense={
            id: (this.allExpense.length>0) ? this.allExpense[this.allExpense.length-1]['id']+1 : 1,
            title: title,
            amount: amount,
            desc: desc,
            date: date
        }
        this.allExpense.push(expense);
        localStorage.removeItem('expenses');
        localStorage.setItem('expenses',JSON.stringify(this.allExpense));
        this.expenseTbody.innerHTML='';
        this.displayAllExpense();
        this.updateTodayExpenses(); 
    }
    todayExpense(){
        let date = new Date().getDate();
        date = (date<10) ? '0'+date : date;
        let month = new Date().getMonth()+1;
        let year = new Date().getFullYear();
        let today = year+'-'+month+'-'+date;
        for(let i=0;i<this.allExpense.length;i++){
            let expenseDate = this.allExpense[i]['date'];
            console.log(today,expenseDate);
            if(today === expenseDate){
                this.todayExpenses.push(this.allExpense[i]);
            }
        }
        this.displayTodayExpense();
    }
    displayTodayExpense(){
        let expenseList = document.querySelector('#todays-list');
        let todayAmt = document.querySelector('#today-amt');
        let total = 0;
        for(let i=0;i<this.todayExpenses.length;i++){
            let li=document.createElement('li');
            li.classList.add('expense-list');
            li.innerHTML='<b>'+this.todayExpenses[i]['title']+'</b>&nbsp;(Rs.'+this.todayExpenses[i]['amount']+')';
            total += parseInt(this.todayExpenses[i]['amount']);
            expenseList.prepend(li);
        }
        todayAmt.innerText = 'Rs.'+total;
    }
    updateTodayExpenses(){
        this.todayExpenses=[];
        let expenseList = document.querySelector('#todays-list');
        expenseList.innerHTML = '';
        this.todayExpense();
        this.displayChart();
    }
    displayChart(){
        let displayData = []; 
        displayData.push(['Title', 'Amount']);
        
        for(let i=0;i<this.allExpense.length;i++){
            let value = [];
            value.push(this.allExpense[i]['title']);
            value.push(parseInt(this.allExpense[i]['amount']));
            displayData.push(value);
        }
        google.charts.load('current', {packages: ['corechart', 'bar']});
        google.charts.setOnLoadCallback(drawMultSeries);
        let that = this;
        function drawMultSeries() {
            var data = google.visualization.arrayToDataTable(displayData);
            var options = {
                title: 'My Expenses',
                chartArea: {width: '60%'},
                hAxis: {
                title: 'Amount',
                minValue: 0
                },
                vAxis: {
                title: 'Title'
                }
            };

            var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
            chart.draw(data, options);
        }
    }
}
export default Expense;