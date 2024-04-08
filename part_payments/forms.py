from django import forms

class NumberPaymentsForm(forms.Form):
    selected_number = forms.IntegerField(label='Number of Payments', min_value=1, max_value=25)
