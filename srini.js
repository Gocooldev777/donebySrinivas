bills=[{'USER_A':1000,'USER_B':2000,'USER_C':1000},
{'USER_A':300,'USER_B':400,'USER_C':100,'USER_D':200}, 
{'USER_A':3000,'USER_B':100,'USER_D':200},]
function average(BILL){
average_value=[]

//TO FIND AVERAGE OF EACH BILL and pushing in  SINGLE ARRAY   average=total value of single bill/total users in single bill
 for(j=0;j<BILL.length;j++){
    sum=0
    count=0
    avrg=0
    for(i in BILL[j]){
        sum+=BILL[j][i]
        count++
        avrg=sum/count
    }
    average_value.push(avrg) 
 }return average_value    //CONSOLE.LOG here for get average values
}average(bills)  

//TO FIND USERS NAME (ONLY KEYS every value) AND pushing in ARRAY(people)
function user_name(str){
  people=[]
  for(j=0;j<str.length;j++){
    for(i in str[j]){
       if(!people.includes(i)){
          people.push(i)
       }
    }
  }return people;      //CONSOLE.LOG here for get users name
}user_name(bills)

//TO FIND HOW MUCH THEY NEED TO PAY TO OTHERS
function remain(num){
remain_amount=[]
for(j=0;j<num.length;j++){
    bill1_avarege={}
    for(i in num[j]){   
      bill1_avarege[i]=num[j][i]-average_value[j]
    }
    remain_amount.push(bill1_avarege)
}
return remain_amount    //CONSOLE.LOG here for getting each user how much they need to pay/get from others with users name //separeted by bills
}remain(bills)

//Settlement - Whole Array contains of each user how much they need to get and give
function total_amount(remain_amount){
person=people
final_settelment={}
for(i=0;i<person.length;i++){
    total=0
    for(j=0;j<remain_amount.length;j++){ 
       for(k in remain_amount[j]){
        if(k===person[i]){
            total+=remain_amount[j][k]
           }  
        }   
    }
    final_settelment[person[i]]=total 
} 
return final_settelment      //CONSOLE.LOG here to get each users contribution
}total_amount(remain_amount) 

//Separating payer and getter by positive and negative values
function split_Payer_geter(final_settelment){
getter={}
payer={}
for(i in final_settelment){
    if(final_settelment[i]>0){ 
        payer[i]=final_settelment[i]
    }else{
        getter[i]=final_settelment[i]
    }
}
return getter,payer;
}split_Payer_geter(final_settelment)

function sor(a,b){ //negative value sorting function
    return b-a
}

//Again sorting payer and getter sorted amounts after separated positive and negative and mapping with their keys(user name)
function sorted_amounts(getter,payer){
getter_sort=[]
final_getter={}
payer_sort=[]
final_payer={}
for(i in getter){
    getter_sort.push(getter[i])
}
getter_sort=getter_sort.sort(sor).reverse()
for(j of getter_sort){
    for(k in getter){
        if(j==getter[k]){
            final_getter[k]=getter[k]
        }
    }  
}
for(i in payer){
    payer_sort.push(payer[i])
}
payar_sort=payer_sort.sort(sor)
for(j of payer_sort){
    for(k in payer){
        if(j==payer[k]){
            final_payer[k]=payer[k]
        }
    }  
}
return final_getter,final_payer;
}sorted_amounts(getter,payer)

//output function , to get output like who need to pay how much to whom 
function final_result(final_getter,final_payer){
    for(i in final_payer){
        for(j in final_getter){
            if(final_payer[i]!=0 && final_getter[j]!=0){
                if(final_payer[i]>Math.abs(final_getter[j])){
                        console.log(`${j} Need to pay ${Math.abs(final_getter[j])} to:${i}`);
                        loop=payer[i]-Math.abs(final_getter[j])
                        final_getter[j]=0
                        final_payer[i]=loop
    
                    }else if(final_payer[i]<Math.abs(final_getter[j])){
                        console.log(`${j} Need to pay ${Math.abs(final_payer[i])} to: ${i}`);
                        loop=payer[i]-Math.abs(final_getter[j])
                        final_payer[i]=0
                        final_getter[j]=loop         
                    } else if(final_payer[i]==Math.abs(final_getter[j])){
                        console.log(`${j} Need to pay ${Math.abs(final_getter[j])} to: ${i}`);
                        final_payer[i]=0  
                        final_getter[j]=0
                        
                    } 
                }
        }
    }
}final_result(final_getter,final_payer)