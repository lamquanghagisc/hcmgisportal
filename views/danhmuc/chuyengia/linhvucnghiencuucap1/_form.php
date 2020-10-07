<?php
use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\LinhvucnghiencuuCap1 */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="linhvucnghiencuu-cap1-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'ten_cap1')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'ma_cap1')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'ghichu_cap1')->textInput(['maxlength' => true]) ?>



  
	<?php if (!Yii::$app->request->isAjax){ ?>
	  	<div class="form-group">
	        <?= Html::submitButton($model->isNewRecord ? 'Create' : 'Update', ['class' => $model->isNewRecord ? 'btn btn-success' : 'btn btn-primary']) ?>
	    </div>
	<?php } ?>

    <?php ActiveForm::end(); ?>
    
</div>
