#!/usr/bin/env ruby
require 'rubygems'
require 'mechanize'
require 'mailgun'
require_relative 'keys'

agent = Mechanize.new

# GET PROPERTIES
obj = Array.new
f = File.open(File.dirname(__FILE__) + "/message.txt", "r")
f.each_line do |line|
  obj << line
end
f.close

page = agent.get('https://clear.titleboxingclub.com/clubLogin.aspx')

username = ""
password = ""
email = ""
location = obj[17].chomp!
twilio_key = get_mailgun_key

if location == "coolsprings"
  username = get_username_coolsprings
  password = get_password_coolsprings
elsif location == "greenhills"
  username = get_username_greenhills
  password = get_password_greenhills
end

# LOGIN
login_form = page.form_with(:id => 'aspnetForm') do |f|
  f.field_with(:name => 'ctl00$cphBody$tbID').value = username
  f.field_with(:name => 'ctl00$cphBody$tbPWD').value = password
end

# NEW PROSPECT FORM
page = login_form.click_button
puts "Logged in!"

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
16 this.married = user.married;
17 this.location = user.location;
18 this.fitnessgoals = user.fitnessgoals;
21 this.concent = user.concent;
=end

page = page.link_with(:href => '/prospects/NewProspect.aspx').click
input = 'ctl00$ctl00$ctl00$cphMainBody$cphBody$cphProspectBody$'
notes = "First Shot Requested Time: " + obj[14] + " ----- Workout Goals: " + obj[18]

new_form = page.form_with(:id => 'aspnetForm') do |f|

  #f.field_with(:name="#{input}tbEMCFirstName").value = ec_contact[0]
  #f.field_with(:name="#{input}tbEMCLastName").value = ec_contact[1]
  #f.field_with(:name="#{input}tbEMCHomePhone").value = obj[12]

  f.field_with(:name => "#{input}tbFirstName").value = obj[0]
  f.field_with(:name => "#{input}tbLastName").value = obj[1]
  f.field_with(:name => "#{input}tbBirthDate").value = obj[2]
  f.field_with(:name => "#{input}tbAddress").value = obj[3]
  f.field_with(:name => "#{input}tbHomePhone").value = obj[9]
  f.field_with(:name => "#{input}tbCellPhone").value = obj[9]
  f.field_with(:name => "#{input}tbCity").value = obj[5]
  f.field_with(:name => "#{input}tbZip").value = obj[6]
  f.field_with(:name => "#{input}tbReferral").value = obj[15]
  f.field_with(:name => "#{input}ddEnteredBy").options[12].select
  f.field_with(:name => "#{input}ddSalesPerson").options[12].select
  f.field_with(:name => "#{input}tbEmail").value = obj[7]
  f.field_with(:name => "#{input}tbHistoryNote").value = notes
  f.field_with(:name => "#{input}tbFirstShotDate").value = obj[13]

  #f.field_with(:name => "#{input}tbAddNote").value = obj[10]
  if obj[16] = 'no'
    f.field_with(:name => "#{input}ddMarried").options[1].select
  elsif obj[16] = 'yes'
    f.field_with(:name => "#{input}ddMarried").options[2].select
  end
  f.field_with(:name => "#{input}tbEmail").value = obj[7]
  #f.field_with(:name => "#{input}tbEMCFirstName").value = obj[11];
  #f.field_with(:name => "#{input}tbEMCHomePhone").value = obj[12];
end
# new_form.click_button(new_form.button_with(:name => "#{input}bEMCAdd"))
new_form.click_button(new_form.button_with(:name => "#{input}bSave"))

=begin
mg_client = Mailgun::Client.new(twilio_key)

message_params = {:from    => 'bob@sending_domain.com',
                  :to      => 'steve.a.finley@gmail.com',
                  :subject => 'The Ruby SDK is awesome!',
                  :text    => 'It is really easy to send a message!'}

result = mg_client.send_message("example.com", message_params).to_h!

message_id = result['id']
message = result['message']

puts message
=end

puts "prospect successfully added!"
