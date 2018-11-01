$().ready(function() {
	queryPercentage();
	loadHRBPGroupEvaList();

});
/** 获取主管比例统计* */
function queryPercentage() {
	$.ajax({
		url : path + '/service/performanceHRBPEva/percentage',
		dataType : "json",
		cache : false,
		type : "get",
		success : function(data) {
			$("#percentA").html(data["percentA"] == undefined ? 0 : data["percentA"]);
			$("#percentBplus").html(data["percentB+"] == undefined ? 0 : data["percentB+"]);
			$("#percentB").html(data["percentB"] == undefined ? 0 : data["percentB"]);
			$("#percentC").html(data["percentC"] == undefined ? 0 : data["percentC"]);
			$("#percentD").html(data["percentD"] == undefined ? 0 : data["percentD"]);
			$("#empA").html(data["A"] == undefined ? 0 : data["A"]);
			$("#empBplus").html(data["B+"] == undefined ? 0 : data["B+"]);
			$("#empB").html(data["B"] == undefined ? 0 : data["B"]);
			$("#empC").html(data["C"] == undefined ? 0 : data["C"]);
			$("#empD").html(data["D"] == undefined ? 0 : data["D"]);
			$("#empSum").html(data["sum"]);
		}
	});
}
/** 导出集体评议数据 */
function groupEvaExport() {
	var url = path + '/service/performanceHRBPEva/processing/result/export';
	window.location.href = url;
}
/** 获取所有员工当年当季表格* */
function loadHRBPGroupEvaList() {
	var columns = [ {
		title : '序号',
		formatter : function(value, row, index) {
			return "<span>" + (index + 1) + "</span>";
		}
	}, {
		field : 'ehr',
		title : 'E-HR编号'
	}, {
		field : 'lobNo',
		title : 'LOB工号'
	}, {
		field : 'name',
		title : '姓名'
	}, {
		field : 'hireDate',
		title : '入职时间'
	}, {
		field : 'role',
		title : '职务'
	}, {
		field : 'serviceLine',
		title : '业务线'
	}, {
		field : 'bu',
		title : '事业部'
	}, {
		field : 'du',
		title : '交付部'
	}, {
		field : 'location',
		title : '归属地'
	}, {
		field : 'keymember',
		title : '是否<br/>骨干'
	}, {
		field : 'participate',
		title : '是否<br/>参评'
	}, {
		field : 'manager',
		title : '直接主管'
	}, {
		field : 'customerFeedback',
		title : '客户反馈',
		formatter : function(value, row, index) {
			var substr = "";
			if (value.length > 5) {
				substr = value.substring(0, 5);
				return "<a href='#' class='link'>" + substr + "<div class='tips'>" + value + "</div></a>";
			} else {
				return value;
			}
		}
	}, {
		field : 'initialEvalution',
		title : '初评<br/>(依据<br/>客户<br/>反馈)',
	}, {
		field : 'pmEvalution',
		title : '直接<br/>主管<br/>初评<br/>结果',
	}, {
		field : 'duEvalution',
		title : '部门<br/>集体<br/>评议<br/>结果',
	}, {
		field : 'duEvaManager',
		title : '集体<br/>评议<br/>主管'
	}, {
		field : 'achievement',
		title : 'A/C/D<br/>人员<br/>绩效<br/>事实'
	}, {
		field : 'jump',
		title : '是否<br/>绩效<br/>跳变'
	}, {
		field : 'comments',
		title : '备注',
	}, {
		field : 'previous1Quarter',
		title : '上<br/>季度<br/>绩效'
	}, {
		field : 'previous2Quarter',
		title : '上上<br/>季度<br/>绩效'
	}, {
		field : 'previous3Quarter',
		title : '上上上<br/>季<br/>度绩效'
	}, {
		title : '详情',
		formatter : function(value, row, index) {

			return "<a href='javascript:void(0);' onClick='detail(\"" + row.resultId + "\")' " + "' class='btn btn-info btn-small'><i class='glyphicon glyphicon-edit'></i></a>";
		}
	} ];

	var table = $('#HRBPGroupEvaList').bootstrapTable({
		url : path + '/service/performanceHRBPEva/processing/result/list', // 请求后台的URL（*）
		method : 'GET', // 请求方式（*）
		// toolbar: '#toolbar', //工具按钮用哪个容器
		striped : true, // 是否显示行间隔色
		cache : false, // 是否使用缓存，默认为true，所以一般情况下需要设置一下这个属性（*）
		pagination : true, // 是否显示分页（*）
		sortable : true, // 是否启用排序
		sortOrder : "asc", // 排序方式
		sidePagination : "server", // 分页方式：client客户端分页，server服务端分页（*）
		pageNumber : 1, // 初始化加载第一页，默认第一页,并记录
		pageSize : 2, // 每页的记录行数（*）
		pageList : [ 10, 25, 50, 100 ], // 可供选择的每页的行数（*）
		search : false, // 是否显示表格搜索
		strictSearch : false,
		showColumns : false, // 是否显示所有的列（选择显示的列）
		// showRefresh: true, //是否显示刷新按钮
		minimumCountColumns : 2, // 最少允许的列数
		clickToSelect : true, // 是否启用点击选中行
		height : 500, // 行高，如果没有设置height属性，表格自动根据记录条数觉得表格高度
		uniqueId : "id", // 每一行的唯一标识，一般为主键列
		showToggle : false, // 是否显示详细视图和列表视图的切换按钮
		cardView : false, // 是否显示详细视图
		detailView : false, // 是否显示父子表
		singleSelect : false, // 禁止多选_____
		// 得到查询的参数
		queryParams : function(params) {
			console.log("params");
			return {
				pageSize : params.limit,
				pageNumber : params.offset / params.limit + 1,
			};
		},
		columns : columns,
		onLoadSuccess : function(sta) {
			console.log("in onLoadSuccess");
			console.log(sta);
		},
		onLoadError : function(status, res) { // 加载失败时执行
			console.log(res);
			console.log("error.status:" + status);
		},
		onDblClickRow : function(row, $element) {
		}

	});
}

function detail(resultId) {
	// 页面跳转post提交
	$("#detailForm").remove();
	var url = path + '/service/performanceManageEva/goal/detail.html';
	var $eleForm = $("<form method='post' class='hidden' id='detailForm'></form>");
	$eleForm.attr("action", url);
	$(document.body).append($eleForm);

	var idInput = $("<input type='text' name='resultId' class='hidden'></input>");
	var titleInput = $("<input type='text' name='title' class='hidden'></input>");
	var typeInput = $("<input type='text' name='type' class='hidden'></input>");
	idInput.attr("value", resultId);
	titleInput.attr("value", "HRBP->绩效考评->集体评议");
	typeInput.attr("value", "7");
	$("#detailForm").append(idInput);
	$("#detailForm").append(titleInput);
	$("#detailForm").append(typeInput);
	$eleForm.submit();
}
