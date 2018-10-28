# students-radar-ui
Система должна поддерживать список студентов одной группы, список
преподавателей, список экзаменационных дисциплин текущей сессии. Для студентов
необходимыми атрибутами являются: фамилия, имя, отчество, пол, дата рождения,
наличие льготы (да/нет), статус (продолжает обучение/в академотпуске/задолженник),
место проживания (в общежитии либо значение отсутствует), факультет, специальность,
курс, форма обучения (бюджет/платное), группа, средний балл последней сессии, размер
стипендии; для преподавателей - фамилия, имя, отчество, место работы (факультет).
Система должна хранить число мест в общежитии и количество бюджетных мест для
студентов данной группы. Для ввода исходных данных должны быть предусмотрены
соответствующие пользовательские интерфейсы либо исходные данные могут
загружаться из внешних файлов (источников).
Система должна обеспечивать ввод промежуточной и экзаменационной оценок
для каждого студента по каждой дисциплине, расчет итоговой оценки, учитывая
рейтинговую систему, для дисциплин текущей экзаменационной сессии по 10-балльной
системе (1 – 10, а также неявка). В результате неявки на экзамен, а также получения
оценок “1”, “2” и “3”, статус студента должен автоматически устанавливаться в значение
“задолженник”.
Средний балл текущей сессии для студента должен рассчитываться сразу после
ввода последней оценки, т.е. атрибут “средний балл” может иметь значение только в том
случае, если по всем дисциплинам существуют оценки (контролировать).
Для студентов со статусом “в академотпуске” оценки по дисциплинам сессии
выставлять запрещено (контролировать).
По результатам экзаменационной сессии для студентов, не являющихся
задолженниками и не находящимся в академическом отпуске, необходимо изменить
значение атрибута “форма обучения” по следующим правилам: N студентам с
наибольшими средними баллами за текущую сессию установить “форму обучения” в
значение “бюджет”, где N - количество бюджетных мест. Остальные студенты
переводятся на платную форму обучения.
По результатам экзаменационной сессии для студентов, не находящимся в
академическом отпуске, необходимо изменить значение атрибута “место проживания” по
следующим правилам: приоритет при заселении в общежитие имеют студенты с льготами,
даже если они имеют задолженность; оставшиеся же места из общего числа мест в
общежитии отдаются студентам с наибольшими средними баллами за текущую сессию.
Для студентов бюджетной формы обучения рассчитать размер стипендии по
следующим правилам:
Размер стипендии = базовая величина * коэффициент, где коэффициент
определяется по таблице:
Средний балл
Коэффициент
< 6
1
< 8.5
1.4
<=10
1.8
Размер базовой величины примем за 100 рублей.
Система также должна обеспечить реализацию следующих функций:
–
для всех дисциплин текущей сессии указать преподавателя
–
для каждой дисциплины определить коэффициенты для промежуточной и
экзаменационной оценки.
–
для каждого студента указать преподавателя того же факультета, как
руководителя курсовой работы
