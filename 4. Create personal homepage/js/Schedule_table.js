// 7월달 개인 일정표 테이블
document.writeln("<table class='sch'>");
document.writeln("<tr><th class='sun'>일</th><th>월</th><th>화</th><th>수</th><th>목</th><th>금</th><th class='sat'>토</th></tr>")

var check=0;
document.writeln("<tr>")
for(var day=1; day<=31; day++){
	// 일요일인 경우 빨간 숫자로
	if(day%7==1){
		document.writeln("<td class='sun' valign='top'>" + day + "<p>- 교회가기</p></td>");
	}
	// 토요일인 경우 파란 숫자로
	else if(day%7==0){
		if(day==28)
			document.writeln("<td class='sat' valign='top'>" + day + "<p>- 박효신<br>&nbsp;&nbsp;뮤지컬</p></td>");
		else
			document.writeln("<td class='sat' valign='top'>" + day + "<pre>- 축구<br>- 개인시간</pre></td>");
	}
	// 그 외의 요일은 검정 숫자
	else{
		if(day==2 || day==4 || day==6 || day==9 || day==11 || day==13 || day==16 || day==18 || day==20 || day==23 || day==25 || day==27 || day==30)
			document.writeln("<td class='day' valign='top'> " + day + "<p class='day'>- 토익학원</p></td>");
		else if(day==31)
			document.writeln("<td valign='top'> " + day + "<p class='birth'>- My <br>&nbsp;&nbsp;BirthDay</p></td>");
		else
			document.writeln("<td class='day' valign='top'> " + day + "<p>- 연구실</td>");
	}
	check++;
	// 일주일 날짜를 다 출력했으면 줄 바꿈을 실행
	if(check==7){
		document.writeln("</tr>");
		check=0;
		document.writeln("<tr>");
		/*for(var i=1; i<=7; i++){
			document.writeln("<td>" + "&nbsp;" + "</td>");
		}
		document.writeln("</tr>");*/
	}
	if (day==31) {
		for(var i=1; i<=4; i++){
			document.writeln("<td>" + "&nbsp;" + "</td>");
		}
	}
}
document.writeln("</table>");
