import 'package:flutter/material.dart';
import 'food_menu.dart';

String title = 'My App';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: title,
      home: const MyHomePage(),
      theme: ThemeData(primarySwatch: Colors.pink, fontFamily: ('Poppins')),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  // แสดงผลข้อมูล
  @override
  Widget build(BuildContext context) {
    // 3
    // List<Widget> data = [];

    // data.add(const Text("Hello World"));
    // data.add(const Text('กดปุ่มเพื่อเพิ่มจำนวน'));
    // data.add(Text(
    //   number.toString(),
    //   style: const TextStyle(fontSize: 60),
    // ));

    // for (var i = 0; i < 10; i++) {
    //   data.add(Text("รายการที่ $i"));
    // }

    List<FoodMenu> menu = [
      FoodMenu("กระเพราหมูกรอบ", "80", "assets/images/1.jpg"),
      FoodMenu("กุ้งเผา", "500", "assets/images/2.jpg"),
      FoodMenu("ส้มตำ", "60", "assets/images/3.jpg"),
      FoodMenu("ผัดไทย", "50", "assets/images/4.jpg"),
      FoodMenu("ผัดพริกแกงไก่", "50", "assets/images/5.jpg")
    ];

    return Scaffold(
        appBar: AppBar(
          title: const Text("Flutter เลือกเมนู"),
        ),
        body: ListView.builder(
            itemCount: menu.length,
            itemBuilder: (BuildContext context, int index) {
              FoodMenu food = menu[index];
              return ListTile(
                leading: Image.asset(
                  food.img,
                  width: 80,
                  height: 80,
                  fit: BoxFit.fitWidth,
                ),
                title: Text(
                  food.name,
                  style: const TextStyle(
                      fontSize: 18, fontWeight: FontWeight.bold),
                ),
                subtitle: Text("ราคา ${food.price} บาท"),
                onTap: () => {print('เมนู: ${food.name}')},
              );
            }));

    // ข้อมูลอยู่ตรงกลางจอ (6)
    // Center(
    // แสดงผลแบบ List View
    // child: ListView(
    //   children: getData(25),
    // ),

    // 2
    // child: Column(
    //     mainAxisAlignment: MainAxisAlignment.center, children: data),

    // 1
    // child: Image(
    //     image: NetworkImage(
    //         "https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1474&q=80")),
    // child: Text(
    //   "Body Data",
    //   style: TextStyle(fontSize: 0, color: Colors.blueGrey),
    // ),
    // ));

    // button ลอยขวาล่าง (5)
    // floatingActionButton: FloatingActionButton(
    //   onPressed: addNumber,
    //   child: const Icon(Icons.add),
    // ));
  }

  // (5)
  // void addNumber() {
  //   setState(() => {number++});
  // }

  // เตรียมข้อมูล (6)
  // List<Widget> getData(int count) {
  //   List<Widget> data = [];

  //   data.add(const Text("Hello World"));
  //   data.add(const Text('กดปุ่มเพื่อเพิ่มจำนวน'));
  //   data.add(Text(
  //     number.toString(),
  //     style: const TextStyle(fontSize: 60),
  //   ));

  //   for (var i = 0; i < count; i++) {
  //     var menu = Text(
  //       "เมนู ${i + 1}",
  //       style: const TextStyle(fontSize: 18),
  //     );

  //     var menu2 = ListTile(
  //       title: Text(
  //         "เมนูที่ $i",
  //         style: const TextStyle(fontSize: 20, fontWeight: FontWeight.w700),
  //       ),
  //       subtitle: Text("ข้อย่อยที่ $i"),
  //     );

  //     data.add(menu2);
  //   }

  //   return data;
  // }
}


// ------------------------------------------

// Padding(
//           padding: const EdgeInsets.all(8),
//           child: Column(
//             children: [
//               MoneyBox("ยอดคงเหลือ", 15000, Colors.lightBlue, 120),
//               const SizedBox(height: 8),
//               MoneyBox("รายรับ", 20000, Colors.green, 100),
//               const SizedBox(height: 8),
//               MoneyBox("รายจ่าย", 5000, Colors.red, 100),
//               const SizedBox(height: 8),
//               MoneyBox("ยอดค้างชำระ", 10000005.51, Colors.orange, 100)
//             ],
//           ),
//         )