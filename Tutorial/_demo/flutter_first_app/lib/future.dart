void main() async {
  // print(await loginUser());
  // print("1. ทำงาน");

  String? name;
  String? name2;
  // Null Coalescing
  print(name ?? "Dryst");
  print(name);

  // Null Coalescing Assignment
  print(name2 ??= "Dryst2");
  print(name2);

  // Null Conditional
  Employee? emp;
  emp?.showData();
}

Future<String> loginUser() async {
  var user = await getUserFromDatabase();
  return user;
}

Future<String> getUserFromDatabase() {
  return Future.delayed(const Duration(seconds: 1), () => "Dryst");
}

class Employee {
  void showData() {
    print("Dryst3");
  }
}
