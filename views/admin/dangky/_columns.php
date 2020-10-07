<?php

use kartik\grid\GridView;
use yii\helpers\ArrayHelper;
use yii\helpers\Url;

return [

    [
        'class' => 'kartik\grid\SerialColumn',
        'width' => '30px',
    ],

    [
        'class' => '\kartik\grid\DataColumn',
        'attribute' => 'ho_ten',
        'width' => '250px',
        'value' => function ($model, $key, $index, $widget) {
            return "<a href='".Yii::$app->urlManager->createUrl('admin/chuyengia/view')."?id=".$model->id_chuyengia."'>".mb_strtoupper($model->ho_ten)."</a>";
        },
        'format' => 'raw'
    ],
    [
        'class' => '\kartik\grid\DataColumn',
        'attribute' => 'nam_sinh',
        'width' => '80px',
        'value' => function ($model, $key, $index, $widget) {
            if ($model->nam_sinh == '') {
                return '';
            } else {
                return $model->nam_sinh;
            }

        },
        'format' => 'raw'
    ],
    [
        'attribute' => 'gioi_tinh',
        'width' => '100px',
        'value' => function ($model, $key, $index, $widget) {
            if ($model->gioi_tinh == 1) {
                $gioitinh = 'Nam';
            } else {
                $gioitinh = 'Nữ';
            }
            return $gioitinh;
        },
        'filterType' => GridView::FILTER_SELECT2,
        'filter' => [1 => 'Nam', 2 => 'Nữ'],
        'filterWidgetOptions' => [
            'pluginOptions' => ['allowClear' => true],
        ],
        'filterInputOptions' => ['placeholder' => ''],
        'format' => 'raw'
    ],
    [
        'class' => '\kartik\grid\DataColumn',
        'attribute' => 'donvi_id',
        'value' => function ($model, $key, $index, $widget) {
            if ($model->donvi != null) {
                return $model->donvi->ten_donvi;
            } else {
                return '';
            }

        },
        'format' => 'raw'
    ],
    [
        'class' => '\kartik\grid\DataColumn',
        'attribute' => 'created_by',
        'value' => function ($model, $key, $index, $widget) {
            return $model->taikhoan->ten_dang_nhap;
        },
        'label' => 'Người đăng ký',
        'format' => 'raw'
    ],
    [
        'class' => '\kartik\grid\DataColumn',
        'attribute' => 'created_at',
        'value' => function ($model, $key, $index, $widget) {
            return ($model->created_at != null) ? date('d-m-Y H:i:s', strtotime($model->created_at)) : '';
        },
        'label' => 'Thời gian đăng ký',
        'format' => 'raw'
    ],

//    [
//        'class' => '\kartik\grid\DataColumn',
//        'attribute' => 'chuyen_mon',
//    ],
//    [
//        'class' => '\kartik\grid\DataColumn',
//        'attribute' => 'ten_dvct',
//        'label' => 'Loại hình tổ chức',
//        'value' => function ($model, $key, $index, $widget) {
//            if ($model->ten_dvct == '') {
//                return '';
//            } else {
//                return $model->ten_dvct;
//            }
//        },
//        'format' => 'raw'
//    ],
//    [
//        'class' => '\kartik\grid\DataColumn',
//        'attribute' => 'ten_lvql',
//        'width' => '150px',
//        'value' => function ($model, $key, $index, $widget) {
//            if ($model->ten_lvql == '') {
//                return '';
//            } else {
//                return $model->ten_lvql;
//            }
//        },
//        'format' => 'raw'
//    ],
//     [
//         'class'=>'\kartik\grid\DataColumn',
//         'attribute'=>'ghi_chu',
//     ],
    // [
    // 'class'=>'\kartik\grid\DataColumn',
    // 'attribute'=>'geom',
    // ],
    [
        'label' => 'Thao tác',
        'width' => '100px',
        'value' => function ($model) {
            $viewButton = "<a href='" . Yii::$app->urlManager->createUrl('admin/dangky/viewchuyengia') . '?id=' . $model->id_chuyengia . "' class='btn btn-info btn-xs'><i class='fa fa-eye'></i></a>";
            $updateButton = "<a href='" . Yii::$app->urlManager->createUrl('admin/dangky/updatechuyengia') . '?id=' . $model->id_chuyengia . "' class='btn btn-warning btn-xs'><i class='fa fa-pencil'></i></a>";
            $deleteButton = "<a class='btn btn-danger btn-xs custom-element-load-ajax-div' data-toggle='modal' data-target='#ajaxModal' data-target-div='#ajaxModalContent' data-url='" . Yii::$app->urlManager->createUrl('admin/chuyengia/delete') . '?id=' . $model->id_chuyengia . "'><i class='fa fa-trash'></i></a>";
            return $updateButton;
        },
        'format' => 'raw'
    ],
];
                