﻿namespace QuizApp.Api.Models
{
    public class Question
    {
        public int Id { get; set; }
        public string Text { get; set; }
        public List<Option> Options { get; set; }
    }
}
