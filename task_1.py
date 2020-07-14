import string
def pattern(n): 

    k = 2*n - 2
  
    # loop for row
    alpa_counter = 0 # print alphabatic
    for i in range(0, n): 
      
        # loop for print a space
        for j in range(0, k): 
            print(end=" ") 
      
        # decrementing k after each loop 
        k = k - 1
      
        # print a column
        for j in range(0, i+1): 
            print("{0}{1} ".format(string.ascii_lowercase[alpa_counter],i+1), end="") 
            alpa_counter = alpa_counter+1 # increment alpabatic
      
        # ending line after each row 
        print("\r") 

pattern(4)