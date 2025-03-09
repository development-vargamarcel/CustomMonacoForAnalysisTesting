
const source1VB =
  `
Module UglyCode
Sub Main()
Dim obj As New UglyClass()
obj.StartProcess()
End Sub
End Module

Class UglyClass
Public Sub StartProcess()
Dim i As Integer = 0
While i < 5
If i Mod 2 = 0 Then
For j As Integer = 0 To 2
If j = 1 Then
Dim k As Integer = 0
Do While k < 3
If k Mod 2 <> 0 Then
Console.WriteLine("Deeply nested loop with k=" & k)
Dim helper As New HelperClass()
helper.DoSomething(k)
Else
If k = 0 Then
Console.WriteLine("Pointless condition with k=" & k)
Else
If k = 2 Then
Console.WriteLine("Yet another nested If with k=" & k)
End If
End If
End If
k += 1
Loop
Else
Console.WriteLine("J loop iteration: " & j)
End If
Next
Else
Console.WriteLine("I loop iteration: " & i)
End If
i += 1
End While
End Sub
End Class

Class HelperClass
Public Sub DoSomething(value As Integer)
If value > 0 Then
If value < 5 Then
If value Mod 2 = 1 Then
Console.WriteLine("HelperClass doing something with value: " & value)
End If
End If
End If
End Sub
End Class
`


const source2VB =
  `
Module EmployeeManagementSystem
Structure Employee
Dim ID As Integer
Dim Name As String
Dim Age As Integer
Dim Position As String
Dim Salary As Decimal
End Structure
Dim employees As New List(Of Employee)
Sub Main()
Dim choice As Integer
Do
Console.Clear()
Console.WriteLine("Welcome to the Employee Management System")
Console.WriteLine("1. Add Employee")
Console.WriteLine("2. Update Employee")
Console.WriteLine("3. Display All Employees")
Console.WriteLine("4. Search Employee")
Console.WriteLine("5. Exit")
Console.Write("Enter your choice: ")
If Integer.TryParse(Console.ReadLine(), choice) Then
Select Case choice
Case 1
AddEmployee()
Case 2
UpdateEmployee()
Case 3
DisplayEmployees()
Case 4
SearchEmployee()
Case 5
Console.WriteLine("Exiting the system...")
Case Else
Console.WriteLine("Invalid choice, please try again.")
End Select
Else
Console.WriteLine("Invalid input, please enter a number.")
End If
Console.WriteLine("Press any key to continue...")
Console.ReadKey()
Loop While choice <> 5
End Sub
Sub AddEmployee()
Dim newEmployee As Employee
Console.WriteLine("Enter the employee ID: ")
newEmployee.ID = Integer.Parse(Console.ReadLine())
Console.WriteLine("Enter the employee name: ")
newEmployee.Name = Console.ReadLine()
Console.WriteLine("Enter the employee age: ")
newEmployee.Age = Integer.Parse(Console.ReadLine())
Console.WriteLine("Enter the employee position: ")
newEmployee.Position = Console.ReadLine()
Console.WriteLine("Enter the employee salary: ")
newEmployee.Salary = Decimal.Parse(Console.ReadLine())
employees.Add(newEmployee)
Console.WriteLine("Employee added successfully!")
End Sub
Sub UpdateEmployee()
Console.WriteLine("Enter the employee ID to update: ")
Dim searchID As Integer = Integer.Parse(Console.ReadLine())
Dim employeeFound As Boolean = False
For i As Integer = 0 To employees.Count - 1
If employees(i).ID = searchID Then
employeeFound = True
Dim updatedEmployee As Employee = employees(i)
Console.WriteLine("Employee found. Enter the new details (leave blank to skip): ")
Console.WriteLine("Enter the employee name (current: " & updatedEmployee.Name & "): ")
Dim newName As String = Console.ReadLine()
If newName <> "" Then updatedEmployee.Name = newName
Console.WriteLine("Enter the employee age (current: " & updatedEmployee.Age & "): ")
Dim newAge As String = Console.ReadLine()
If newAge <> "" Then updatedEmployee.Age = Integer.Parse(newAge)
Console.WriteLine("Enter the employee position (current: " & updatedEmployee.Position & "): ")
Dim newPosition As String = Console.ReadLine()
If newPosition <> "" Then updatedEmployee.Position = newPosition
Console.WriteLine("Enter the employee salary (current: " & updatedEmployee.Salary.ToString("C") & "): ")
Dim newSalary As String = Console.ReadLine()
If newSalary <> "" Then updatedEmployee.Salary = Decimal.Parse(newSalary)
employees(i) = updatedEmployee
Console.WriteLine("Employee updated successfully!")
Exit For
End If
Next
If Not employeeFound Then
Console.WriteLine("Employee not found.")
End If
End Sub
Sub DisplayEmployees()
If employees.Count = 0 Then
Console.WriteLine("No employees to display.")
Else
Console.WriteLine("Employee List:")
For Each employee As Employee In employees
Console.WriteLine("ID: " & employee.ID)
Console.WriteLine("Name: " & employee.Name)
Console.WriteLine("Age: " & employee.Age)
Console.WriteLine("Position: " & employee.Position)
Console.WriteLine("Salary: " & employee.Salary.ToString("C"))
Console.WriteLine("---------------------------------")
Next
End If
End Sub
Sub SearchEmployee()
Console.WriteLine("Enter the employee ID to search: ")
Dim searchID As Integer = Integer.Parse(Console.ReadLine())
Dim employeeFound As Boolean = False
For Each employee As Employee In employees
If employee.ID = searchID Then
employeeFound = True
Console.WriteLine("Employee found:")
Console.WriteLine("ID: " & employee.ID)
Console.WriteLine("Name: " & employee.Name)
Console.WriteLine("Age: " & employee.Age)
Console.WriteLine("Position: " & employee.Position)
Console.WriteLine("Salary: " & employee.Salary.ToString("C"))
Exit For
End If
Next
If Not employeeFound Then
Console.WriteLine("Employee not found.")
End If
End Sub
End Module
`



const source3SQL =
  `
SELECT a.column1, b.column2, c.column3, d.column4, e.column5, f.column6 FROM table1 a JOIN (SELECT * FROM table2 WHERE column7 = 'value1' AND column8 = 'value2' AND (SELECT COUNT(*) FROM table3 WHERE column9 = 'value3') > 10) b ON a.column1 = b.column1 LEFT JOIN (SELECT column10, column11 FROM table4 WHERE column12 = 'value4' AND column13 IN (SELECT column14 FROM table5 WHERE column15 = 'value5')) c ON b.column2 = c.column10 INNER JOIN (SELECT column16, column17 FROM table6 WHERE column18 = 'value6' AND column19 = (SELECT MAX(column20) FROM table7 WHERE column21 = 'value7')) d ON c.column11 = d.column16 RIGHT JOIN (SELECT column22 FROM table8 WHERE column23 = 'value8' AND column24 = (SELECT SUM(column25) FROM table9 WHERE column26 = 'value9' GROUP BY column27)) e ON d.column17 = e.column22 FULL OUTER JOIN (SELECT column28, column29 FROM table10 WHERE column30 = 'value10' AND column31 = 'value11') f ON e.column23 = f.column28 WHERE a.column32 = 'value12' AND b.column33 IN (SELECT column34 FROM table11 WHERE column35 = 'value13' AND column36 > 50) AND c.column37 = (SELECT AVG(column38) FROM table12 WHERE column39 = 'value14') AND NOT EXISTS (SELECT 1 FROM table13 WHERE column40 = 'value15' AND column41 < 100) ORDER BY a.column1 DESC, b.column2 ASC LIMIT 100 OFFSET 200;
`