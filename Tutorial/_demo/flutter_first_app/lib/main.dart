import 'package:flutter/material.dart';
import 'package:flutter_first_app/money_box.dart';
import 'package:http/http.dart' as http;
import 'ex_change_rate.dart';

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
      theme: ThemeData(primarySwatch: Colors.blue, fontFamily: ('Poppins')),
    );
  }
}

class MyHomePage extends StatefulWidget {
  const MyHomePage({Key? key}) : super(key: key);

  @override
  State<MyHomePage> createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int number = 0;

  ExChangeRate? _dataFromAPI;

  @override
  void initState() {
    super.initState();
    //getExChangeRate();
  }


  Future<ExChangeRate?> getExChangeRate() async {
    Map<String, String> headers = {
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'apikey': '' // https://exchangeratesapi.io/
    };
    var url = Uri.parse(
        'https://api.apilayer.com/exchangerates_data/latest?symbols=THB,USD,EUR&base=USD');

    var response = await http.get(url, headers: headers);
    _dataFromAPI = exChangeRateFromJson(response.body); // JSON => Dart
    return _dataFromAPI;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: const Text("แปลงสกุลเงิน"),
        ),
        body: FutureBuilder(
          future: getExChangeRate(),
          builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
            if (snapshot.connectionState == ConnectionState.done) {
              ExChangeRate result = snapshot.data;
              double? amount = 1506;

              return Padding(
                padding: const EdgeInsets.all(8),
                child: Column(children: [
                  MoneyBox(result.base, amount, Colors.orange, 100),
                  const SizedBox(height: 8),
                  MoneyBox("THB", amount * result.rates!['THB']!,
                      Colors.lightBlue, 100),
                  const SizedBox(height: 8),
                  MoneyBox("EUR", amount * result.rates!['EUR']!,
                      Colors.lightGreen, 100)
                ]),
              );

              // ListTile(
              //   title: Text(result.base.toString()),
              //   subtitle: Text(result.date.toString()),
              // ),
              // ListTile(
              //   title: Text(result.rates!['THB'].toString()),
              // ),
              // ListTile(
              //   title: Text(result.rates!['USD'].toString()),
              // )

            }

            return const LinearProgressIndicator();
          },
        ));
  }
}
