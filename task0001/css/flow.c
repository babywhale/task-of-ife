1.读取txt文件的一条信息，存入结构体

	函数：readLineToStruct();

	结构体：
		def struct txtdata
		{
			string  source_ip
			string  destination_ip
			string  source_port
			string  destination_port
			string  protocol //TCP/UDP/...
			string  text
		}data1

2.增加结构体变量

	函数：addPara();

	string  data1.sign = sourc_ip+destination_ip+source_port+destination_port+protocol
	bool    data1.read = 0

3.全局变量

	string  collecting_sign = null
	have_read = 0

4.进行哈希运算
	
	函数：turnToHash()

5.特征匹配

	函数：Match()

6.
