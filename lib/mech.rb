#!/usr/bin/env ruby
require 'rubygems'
require 'mechanize'
require_relative 'keys'

agent = Mechanize.new
page = agent.get('https://clear.titleboxingclub.com/clubLogin.aspx')

# LOGIN
login_form = page.form_with(:id => 'aspnetForm') do |f|
  f.field_with(:name => 'ctl00$cphBody$tbID').value = get_username
  f.field_with(:name => 'ctl00$cphBody$tbPWD').value = get_password
end

# NEW PROSPECT FORM
page = login_form.click_button
puts "Logged in!"

# GET PROPERTIES
obj = Array.new
f = File.open(File.dirname(__FILE__) + "/message.txt", "r")
f.each_line do |line|
  obj << line
end
f.close

=begin
0  this.firstname = user.firstname;
1  this.lastname = user.lastname;
2  this.bithdate = user.birthdate;
3  this.address = user.address;
4  this.state = user.state;
5  this.city = user.city;
6  this.zip = user.zip;
7  this.email = user.email;
8  this.homephone = user.homephone;
9  this.cellphone = user.cellphone;
10 this.employer = user.employer;
11 this.emergencycontact = user.emergencycontact;
12 this.ecphonenumber = user.ecphonenumber;
13 this.classdate = user.classdate;
14 this.classtime = user.classtime;
15 this.referral = user.referral;
16 this.concent = user.concent;
=end

emergency_contact = 'Emergency Contact: ' + obj[11] + ': ' + obj[12]

page = page.link_with(:href => '/prospects/NewProspect.aspx').click
input = 'ctl00$ctl00$ctl00$cphMainBody$cphBody$cphProspectBody$'

new_form = page.form_with(:id => 'aspnetForm') do |f|
  f.field_with(:name => "#{input}tbFirstName").value = obj[0]
  f.field_with(:name => "#{input}tbLastName").value = obj[1]
  f.field_with(:name => "#{input}tbBirthDate").value = obj[2]
  f.field_with(:name => "#{input}tbAddress").value = obj[3]
  f.field_with(:name => "#{input}tbHomePhone").value = obj[8]
  f.field_with(:name => "#{input}tbCellPhone").value = obj[9]
  f.field_with(:name => "#{input}tbCity").value = obj[5]
  f.field_with(:name => "#{input}tbZip").value = obj[6]
  f.field_with(:name => "#{input}tbReferral").value = obj[15]
  f.field_with(:name => "#{input}ddEnteredBy").options[2].select
  f.field_with(:name => "#{input}ddSalesPerson").options[2].select
  f.field_with(:name => "#{input}tbEmail").value = obj[7]
  #f.field_with(:name => "#{input}tbEMCFirstName").value = obj[11];
  #f.field_with(:name => "#{input}tbEMCHomePhone").value = obj[12];
  f.field_with(:name => "#{input}tbFirstShotDate").value = obj[13]
end
# new_form.click_button(new_form.button_with(:name => "#{input}bEMCAdd"))
new_form.click_button(new_form.button_with(:name => "#{input}bSave"))

puts "prospect successfully added!"
